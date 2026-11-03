import { NextRequest, NextResponse } from 'next/server';
import { transporter, ADMIN_RECIPIENTS, DEFAULT_FROM } from '@/services/mailer';
import { CandidateRegistrationData } from '@/lib/recruitment/schema';

// Rate limiting in-memory map for basic flood control
const submissionTimestamps = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxSubmissions = 5;

  const timestamps = submissionTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxSubmissions) {
    return false;
  }

  recent.push(now);
  submissionTimestamps.set(ip, recent);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    let candidateData: CandidateRegistrationData;
    const attachments: Array<{ filename: string; content: Buffer }> = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const rawJson = (formData.get('data') as string) || '{}';
      try {
        candidateData = JSON.parse(rawJson);
      } catch {
        return NextResponse.json(
          { success: false, message: 'Invalid registration payload format.' },
          { status: 400 }
        );
      }

      // Check optional CV upload
      const cvFile = formData.get('cvFile') as File | null;
      if (cvFile && cvFile.size > 0) {
        // Enforce 6MB size limit
        if (cvFile.size > 6 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, message: 'Uploaded CV exceeds maximum allowed size of 6MB.' },
            { status: 400 }
          );
        }
        const buffer = Buffer.from(await cvFile.arrayBuffer());
        attachments.push({
          filename: cvFile.name || 'Candidate_Resume.pdf',
          content: buffer
        });
      }
    } else {
      candidateData = await req.json();
    }

    // 1. Honeypot check (Spam protection)
    if (candidateData.company_hp) {
      // Silently accept bot submissions without sending emails
      return NextResponse.json({
        success: true,
        reference: `VGR-BOT-${Math.floor(1000 + Math.random() * 9000)}`,
        message: 'Your registration has been submitted.'
      });
    }

    // 2. Server-side required fields validation
    const {
      fullName,
      email,
      phone,
      country,
      city,
      preferredIndustry,
      preferredRole,
      skillCategory,
      preferredDestination,
      consentGiven
    } = candidateData;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !country?.trim() ||
      !city?.trim() ||
      !preferredIndustry?.trim() ||
      !preferredRole?.trim() ||
      !skillCategory ||
      !preferredDestination
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Please fill in all required fields (Name, Email, Phone, Country, City, Industry, Role, Skill Category, Target Destination).'
        },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Consent validation
    if (!consentGiven) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please review and accept the privacy & recruitment registration consent.'
        },
        { status: 400 }
      );
    }

    // Generate reference code
    const currentYear = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceId = `VGR-${currentYear}-${randomHex}`;

    // Format work history HTML for email
    const workHistoryHtml =
      candidateData.isEntryLevelNoExperience || !candidateData.employmentHistory?.length
        ? '<p style="color: #48574F; font-style: italic;">Entry-level candidate applying with no formal prior experience. Ready for training & operational onboarding.</p>'
        : candidateData.employmentHistory
            .filter((j) => j.jobTitle || j.company)
            .map(
              (j) => `
          <div style="background-color: #FAF8F5; border-left: 3px solid #183B2B; padding: 12px 16px; margin-bottom: 12px; border-radius: 4px;">
            <div style="font-weight: 700; color: #0E271B; font-size: 15px;">${j.jobTitle || 'Role'} <span style="font-weight: 400; color: #718178;">at</span> ${j.company || 'Employer'}</div>
            <div style="font-size: 12px; color: #718178; margin: 4px 0 8px;">${j.startDate || 'N/A'} – ${j.isCurrent ? 'Present' : j.endDate || 'N/A'}</div>
            ${j.responsibilities ? `<div style="font-size: 13px; color: #2D3D34; line-height: 1.5;">${j.responsibilities.replace(/\n/g, '<br/>')}</div>` : ''}
          </div>
        `
            )
            .join('');

    const skillsHtml =
      candidateData.skills && candidateData.skills.length > 0
        ? candidateData.skills
            .map(
              (s) =>
                `<span style="display: inline-block; background-color: #FAF8F5; border: 1px solid #E2DBD0; padding: 4px 10px; border-radius: 12px; font-size: 12px; margin: 2px 4px 2px 0; color: #183B2B;">${s}</span>`
            )
            .join('')
        : '<span style="color: #718178;">None specified</span>';

    const languagesHtml =
      candidateData.languages && candidateData.languages.length > 0
        ? candidateData.languages
            .filter((l) => l.language)
            .map((l) => `<strong>${l.language}</strong> (${l.proficiency})`)
            .join(' • ')
        : '<span style="color: #718178;">Not specified</span>';

    // 3. Compile Admin Notification Email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; color: #19231E; padding: 24px; margin: 0; }
          .container { max-width: 680px; margin: 0 auto; background: #FFFFFF; border-radius: 8px; border: 1px solid #E2DBD0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .banner { background-color: #0E271B; color: #EDE4D3; padding: 28px 32px; }
          .banner h1 { margin: 0; font-size: 21px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: #EDE4D3; }
          .banner p { margin: 6px 0 0; font-size: 13px; color: #B3C9BE; }
          .ref-badge { display: inline-block; background-color: #183B2B; color: #EDE4D3; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-family: monospace; letter-spacing: 0.08em; margin-top: 10px; }
          .content { padding: 32px; }
          .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #183B2B; font-weight: 700; border-bottom: 2px solid #E8EFEA; padding-bottom: 6px; margin: 24px 0 14px; }
          .row { margin-bottom: 12px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #718178; font-weight: 700; }
          .value { font-size: 15px; color: #19231E; font-weight: 500; margin-top: 2px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .footer { background-color: #F7F4EE; padding: 20px 32px; font-size: 12px; color: #718178; text-align: center; border-top: 1px solid #E2DBD0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="banner">
            <h1>New Global Candidate Registration</h1>
            <p>Vantara Global Recruitment • International Candidate Dossier</p>
            <div class="ref-badge">Ref: ${referenceId}</div>
          </div>
          <div class="content">
            <div class="section-title" style="margin-top: 0;">1. Candidate Contact & Identity</div>
            <div class="grid-2">
              <div class="row">
                <div class="label">Full Name</div>
                <div class="value" style="font-weight: 700; font-size: 17px; color: #0E271B;">${fullName}</div>
              </div>
              <div class="row">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #183B2B;">${email}</a></div>
              </div>
              <div class="row">
                <div class="label">Phone / WhatsApp</div>
                <div class="value">${phone}</div>
              </div>
              <div class="row">
                <div class="label">Location</div>
                <div class="value">${city}, ${country}</div>
              </div>
              <div class="row">
                <div class="label">Nationality</div>
                <div class="value">${candidateData.nationality || 'Not specified'}</div>
              </div>
              <div class="row">
                <div class="label">Current Occupation</div>
                <div class="value">${candidateData.currentOccupation || 'Not specified'}</div>
              </div>
            </div>

            <div class="section-title">2. Recruitment Preferences & Skill Tier</div>
            <div class="grid-2">
              <div class="row">
                <div class="label">Preferred Industry</div>
                <div class="value" style="font-weight: 600; color: #183B2B;">${preferredIndustry}</div>
              </div>
              <div class="row">
                <div class="label">Target Role / Trade</div>
                <div class="value" style="font-weight: 600;">${preferredRole}</div>
              </div>
              <div class="row">
                <div class="label">Skill Level Tier</div>
                <div class="value"><span style="background: #E8EFEA; color: #183B2B; padding: 3px 8px; border-radius: 4px; font-size: 13px; font-weight: 700;">${skillCategory}</span></div>
              </div>
              <div class="row">
                <div class="label">Target Destination</div>
                <div class="value" style="font-weight: 700; color: #0E271B;">${preferredDestination}</div>
              </div>
              <div class="row">
                <div class="label">Additional Acceptable Regions</div>
                <div class="value">${candidateData.additionalDestinations?.join(', ') || 'None'}</div>
              </div>
              <div class="row">
                <div class="label">Availability to Deploy</div>
                <div class="value">${candidateData.availability || 'Within 1 Month'}</div>
              </div>
            </div>

            <div class="section-title">3. Experience & Qualifications</div>
            <div class="row">
              <div class="label">Years of Experience</div>
              <div class="value">${candidateData.yearsOfExperience || 'Entry-level'}</div>
            </div>
            <div class="row">
              <div class="label">Employment History</div>
              <div style="margin-top: 8px;">${workHistoryHtml}</div>
            </div>
            <div class="row">
              <div class="label">Highest Education</div>
              <div class="value">${candidateData.highestEducation || 'High School'}</div>
            </div>
            ${
              candidateData.certifications
                ? `
            <div class="row">
              <div class="label">Certifications</div>
              <div class="value">${candidateData.certifications.replace(/\n/g, '<br/>')}</div>
            </div>
            `
                : ''
            }
            <div class="row">
              <div class="label">Practical Skills</div>
              <div style="margin-top: 6px;">${skillsHtml}</div>
            </div>
            <div class="row">
              <div class="label">Languages</div>
              <div class="value" style="margin-top: 4px;">${languagesHtml}</div>
            </div>

            <div class="section-title">4. Professional Readiness & Compliance</div>
            <div class="grid-2">
              <div class="row">
                <div class="label">Valid Passport Available</div>
                <div class="value">${candidateData.passportStatus || 'Not specified'}</div>
              </div>
              <div class="row">
                <div class="label">Driving Licence</div>
                <div class="value">${candidateData.drivingLicense || 'None'}</div>
              </div>
            </div>
            ${
              candidateData.professionalNotes
                ? `
            <div class="row" style="margin-top: 12px;">
              <div class="label">Candidate Professional Notes</div>
              <div style="background-color: #FAF8F5; border-left: 3px solid #183B2B; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #2D3D34; margin-top: 4px;">
                ${candidateData.professionalNotes.replace(/\n/g, '<br/>')}
              </div>
            </div>
            `
                : ''
            }
            <div class="row" style="margin-top: 12px;">
              <div class="label">Uploaded CV Attachment</div>
              <div class="value">${attachments.length > 0 ? `Attached (${attachments[0].filename})` : 'Generated CV in portal'}</div>
            </div>
          </div>
          <div class="footer">
            Vantara Global Recruitment • Ascentra Global Ltd • Confidential Candidate Data
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Send email to admin
    await transporter.sendMail({
      from: DEFAULT_FROM,
      to: ADMIN_RECIPIENTS,
      replyTo: email,
      subject: `[Global Recruitment] ${fullName} — ${preferredRole} (${skillCategory} | ${preferredDestination}) [${referenceId}]`,
      html: adminEmailHtml,
      attachments
    });

    // 5. Send automated confirmation receipt to candidate
    try {
      await transporter.sendMail({
        from: DEFAULT_FROM,
        to: email,
        subject: `Registration Confirmed: Vantara Global Recruitment [${referenceId}]`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 28px; color: #19231E; max-width: 600px; margin: 0 auto; border: 1px solid #E2DBD0; border-radius: 8px; background-color: #FAF8F5;">
            <div style="background-color: #0E271B; color: #EDE4D3; padding: 20px 24px; border-radius: 6px; margin-bottom: 24px;">
              <h2 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 0.08em; color: #EDE4D3;">Registration Received</h2>
              <div style="font-size: 12px; color: #B3C9BE; margin-top: 4px;">Reference: <strong>${referenceId}</strong></div>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${fullName}</strong>,</p>

            <p style="font-size: 14px; line-height: 1.6; color: #48574F;">
              Thank you for registering with <strong>Vantara Global Recruitment</strong>. Your candidate profile for <strong>${preferredRole}</strong> (${skillCategory}) targeting <strong>${preferredDestination}</strong> has been successfully submitted to our recruitment database.
            </p>

            <div style="background-color: #FFFFFF; border: 1px solid #E2DBD0; border-radius: 6px; padding: 18px; margin: 20px 0;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #718178; font-weight: 700; margin-bottom: 6px;">Next Steps</div>
              <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; color: #19231E; line-height: 1.6;">
                <li>Our international recruitment coordinators review incoming candidate profiles based on active employer requirements.</li>
                <li>When an employer demand matching your trade experience and destination preference becomes active, a Vantara coordinator will contact you directly.</li>
                <li>Please retain your reference number (<strong>${referenceId}</strong>) for any future correspondence.</li>
              </ul>
            </div>

            <div style="background-color: #E8EFEA; border-left: 3px solid #183B2B; padding: 12px 16px; border-radius: 4px; font-size: 12.5px; color: #0E271B; margin: 20px 0;">
              <strong>Ethical Recruitment Notice:</strong> Vantara operates strictly under fair recruitment standards. We never charge candidates placement fees, recruitment charges, or registration fees.
            </div>

            <hr style="border: none; border-top: 1px solid #E2DBD0; margin: 24px 0;" />

            <p style="font-size: 12px; color: #718178; margin: 0; line-height: 1.5;">
              <strong>Vantara Global Recruitment</strong><br/>
              A venture of Ascentra Global Ltd<br/>
              London, United Kingdom • <a href="https://britsync.co.uk" style="color: #183B2B; text-decoration: underline;">britsync.co.uk</a>
            </p>
          </div>
        `
      });
    } catch (candErr) {
      console.warn('[Vantara Mailer] Candidate confirmation auto-reply failed:', candErr);
    }

    return NextResponse.json({
      success: true,
      reference: referenceId,
      message:
        'Thank you for registering with Vantara Global Recruitment. Your professional profile has been submitted for review. Our team may contact you if your experience matches suitable recruitment opportunities.'
    });
  } catch (error: any) {
    console.error('[Vantara Global Recruitment API Error]', error);
    return NextResponse.json(
      {
        success: false,
        message:
          'An unexpected error occurred while processing your registration. Please try again or reach out to our team at admin@britsync.co.uk directly.'
      },
      { status: 500 }
    );
  }
}

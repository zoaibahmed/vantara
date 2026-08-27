import { NextRequest, NextResponse } from 'next/server';
import { transporter, ADMIN_RECIPIENTS, DEFAULT_FROM } from '@/services/mailer';

export async function POST(req: NextRequest) {
  try {
    let fullName = '';
    let country = '';
    let phone = '';
    let email = '';
    let profession = '';
    let experienceYears = '';
    let preferredDestination = '';
    const attachments: any[] = [];

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      fullName = (formData.get('fullName') as string) || '';
      country = (formData.get('country') as string) || '';
      phone = (formData.get('phone') as string) || '';
      email = (formData.get('email') as string) || '';
      profession = (formData.get('profession') as string) || '';
      experienceYears = (formData.get('experienceYears') as string) || '';
      preferredDestination = (formData.get('preferredDestination') as string) || '';

      const cvFile = formData.get('cv') as File | null;
      if (cvFile && cvFile.size > 0) {
        const buffer = Buffer.from(await cvFile.arrayBuffer());
        attachments.push({
          filename: cvFile.name || 'Candidate_CV.pdf',
          content: buffer
        });
      }
    } else {
      const json = await req.json();
      fullName = json.fullName || '';
      country = json.country || '';
      phone = json.phone || '';
      email = json.email || '';
      profession = json.profession || '';
      experienceYears = json.experienceYears || '';
      preferredDestination = json.preferredDestination || '';
    }

    if (!fullName || !email || !profession) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields (Name, Email, Profession).' },
        { status: 400 }
      );
    }

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #183B2B; padding: 24px; }
          .card { background-color: #FFFFFF; max-width: 620px; margin: 0 auto; border-radius: 8px; border: 1px solid #E5DCB8; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
          .header { background-color: #0E271B; color: #EDE4D3; padding: 28px 32px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
          .header p { margin: 6px 0 0; font-size: 13px; color: #B3C9BE; }
          .body { padding: 32px; }
          .row { margin-bottom: 18px; border-bottom: 1px solid #F0ECE1; padding-bottom: 12px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #7A8C82; font-weight: 700; margin-bottom: 4px; }
          .value { font-size: 15px; color: #183B2B; font-weight: 500; }
          .badge { display: inline-block; padding: 4px 10px; background-color: #FAF8F5; border: 1px solid #E5DCB8; border-radius: 12px; font-size: 12px; font-weight: 600; color: #183B2B; }
          .footer { background-color: #F7F4EE; padding: 18px 32px; font-size: 12px; color: #7A8C82; text-align: center; border-top: 1px solid #E5DCB8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>New Candidate Registration</h1>
            <p>Vantara Workforce Solutions • International Talent Corridor</p>
          </div>
          <div class="body">
            <div class="row">
              <div class="label">Candidate Full Name</div>
              <div class="value" style="font-size: 17px; font-weight: 700;">${fullName}</div>
            </div>
            <div class="row">
              <div class="label">Primary Profession / Role</div>
              <div class="value"><span class="badge">${profession}</span></div>
            </div>
            <div class="row">
              <div class="label">Years of Experience</div>
              <div class="value">${experienceYears || 'Not specified'}</div>
            </div>
            <div class="row">
              <div class="label">Country of Origin / Residence</div>
              <div class="value">${country || 'Not specified'}</div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}" style="color: #183B2B; text-decoration: underline;">${email}</a></div>
            </div>
            <div class="row">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">${phone || 'Not provided'}</div>
            </div>
            <div class="row">
              <div class="label">Preferred Destination Hub</div>
              <div class="value">${preferredDestination || 'Flexible / Any Destination'}</div>
            </div>
            <div class="row" style="border-bottom: none;">
              <div class="label">CV / Resume Attachment</div>
              <div class="value">${attachments.length > 0 ? 'Attached (' + attachments[0].filename + ')' : 'No file uploaded'}</div>
            </div>
          </div>
          <div class="footer">
            Submitted via Vantara Candidate Gateway • Ethical Recruitment Standard
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Send candidate application to admin
    await transporter.sendMail({
      from: DEFAULT_FROM,
      to: ADMIN_RECIPIENTS,
      replyTo: email,
      subject: `[Vantara Candidate] ${fullName} — ${profession} (${country || 'International'})`,
      html: htmlBody,
      attachments
    });

    // 2. Send confirmation to candidate
    try {
      await transporter.sendMail({
        from: DEFAULT_FROM,
        to: email,
        subject: `Your Registration with Vantara Workforce Solutions`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #183B2B; max-width: 580px; margin: 0 auto; border: 1px solid #E5DCB8; border-radius: 8px;">
            <h2 style="color: #0E271B; margin-top: 0; text-transform: uppercase;">Application Received</h2>
            <p>Dear ${fullName},</p>
            <p>Thank you for registering your profile with <strong>Vantara Workforce Solutions</strong> as a <strong>${profession}</strong>.</p>
            <p>Our recruitment team reviews verified profiles for upcoming international luxury resort and hotel deployments. If your qualifications match an active employer requirement, our team will contact you directly.</p>
            <p style="background-color: #FAF8F5; padding: 12px; border-left: 3px solid #183B2B; font-size: 13px;">
              <strong>Ethical Recruitment Notice:</strong> Vantara never charges placement or recruitment fees to candidates. All placements adhere to international fair recruitment principles.
            </p>
            <hr style="border: none; border-top: 1px solid #E5DCB8; margin: 24px 0;" />
            <p style="font-size: 12px; color: #7A8C82; margin: 0;">
              <strong>Vantara Workforce Solutions</strong><br/>
              A venture of Ascentra Global Ltd<br/>
              <a href="https://britsync.co.uk" style="color: #183B2B;">britsync.co.uk</a>
            </p>
          </div>
        `
      });
    } catch (confErr) {
      console.warn('[Vantara Mailer] Candidate confirmation send failed:', confErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your candidate profile has been received and routed to our recruitment coordinators.'
    });
  } catch (error: any) {
    console.error('[Vantara Candidate Mailer Error]', error);
    return NextResponse.json(
      {
        success: false,
        message: 'There was an issue submitting your profile. Please try again or email admin@britsync.co.uk directly.'
      },
      { status: 500 }
    );
  }
}

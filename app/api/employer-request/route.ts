import { NextRequest, NextResponse } from 'next/server';
import { transporter, ADMIN_RECIPIENTS, DEFAULT_FROM } from '@/services/mailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      companyName,
      contactPerson,
      contactEmail,
      contactPhone,
      destinationCountry,
      rolesRequired,
      estimatedHeadcount,
      timeline,
      additionalNotes
    } = data;

    if (!companyName || !contactEmail || !rolesRequired) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields (Company, Email, Roles).' },
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
          .notes-box { background-color: #FAF8F5; border-left: 3px solid #183B2B; padding: 14px 18px; margin-top: 16px; border-radius: 4px; font-size: 14px; color: #2A3D34; }
          .footer { background-color: #F7F4EE; padding: 18px 32px; font-size: 12px; color: #7A8C82; text-align: center; border-top: 1px solid #E5DCB8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>New Employer Workforce Request</h1>
            <p>Vantara Workforce Solutions • B2B Inquiry Received</p>
          </div>
          <div class="body">
            <div class="row">
              <div class="label">Property / Employer Company</div>
              <div class="value">${companyName}</div>
            </div>
            <div class="row">
              <div class="label">Contact Person</div>
              <div class="value">${contactPerson || 'Not provided'}</div>
            </div>
            <div class="row">
              <div class="label">Work Email Address</div>
              <div class="value"><a href="mailto:${contactEmail}" style="color: #183B2B; text-decoration: underline;">${contactEmail}</a></div>
            </div>
            <div class="row">
              <div class="label">Direct Phone / WhatsApp</div>
              <div class="value">${contactPhone || 'Not provided'}</div>
            </div>
            <div class="row">
              <div class="label">Destination / Property Location</div>
              <div class="value">${destinationCountry || 'Not specified'}</div>
            </div>
            <div class="row">
              <div class="label">Hospitality Roles & Departments Required</div>
              <div class="value" style="font-weight: 600;">${rolesRequired}</div>
            </div>
            <div class="row">
              <div class="label">Estimated Headcount</div>
              <div class="value">${estimatedHeadcount || 'Not specified'}</div>
            </div>
            <div class="row">
              <div class="label">Target Deployment Timeline</div>
              <div class="value">${timeline || 'Not specified'}</div>
            </div>
            ${
              additionalNotes
                ? `
            <div class="label" style="margin-top: 18px;">Specific Operational Notes & Preferences</div>
            <div class="notes-box">${additionalNotes.replace(/\n/g, '<br/>')}</div>
            `
                : ''
            }
          </div>
          <div class="footer">
            Submitted via Vantara Workforce Solutions Portal • Ascentra Global Ltd
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Send notification to admin recipients
    await transporter.sendMail({
      from: DEFAULT_FROM,
      to: ADMIN_RECIPIENTS,
      replyTo: contactEmail,
      subject: `[Vantara] New Workforce Request from ${companyName} (${destinationCountry || 'International'})`,
      html: htmlBody
    });

    // 2. Send automated confirmation receipt to employer
    try {
      await transporter.sendMail({
        from: DEFAULT_FROM,
        to: contactEmail,
        subject: `Your Hospitality Workforce Request Received — Vantara Workforce Solutions`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #183B2B; max-width: 580px; margin: 0 auto; border: 1px solid #E5DCB8; border-radius: 8px;">
            <h2 style="color: #0E271B; margin-top: 0; text-transform: uppercase;">Thank you for contacting Vantara</h2>
            <p>Dear ${contactPerson || companyName},</p>
            <p>We have received your hospitality workforce requirement for <strong>${companyName}</strong> regarding: <em>${rolesRequired}</em>.</p>
            <p>Our international coordination team will review your role profiles and headcount timelines within 24 hours. A dedicated advisor will reach out to you directly to present candidate pipelines and deployment options.</p>
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
      console.warn('[Vantara Mailer] Employer confirmation send failed:', confErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting Vantara. Your workforce requirement has been received.'
    });
  } catch (error: any) {
    console.error('[Vantara Mailer Error]', error);
    return NextResponse.json(
      {
        success: false,
        message: 'There was a problem delivering your request. Please try again or email admin@britsync.co.uk directly.'
      },
      { status: 500 }
    );
  }
}

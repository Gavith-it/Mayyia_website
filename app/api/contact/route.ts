import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await req.json();

    // Format the email content dynamically based on the form fields
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 10px;">
          New Form Submission from Sri Mayyia Caterers
        </h2>
    `;

    for (const [key, value] of Object.entries(data)) {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
      htmlContent += `
        <p style="margin: 8px 0;">
          <strong style="color: #333;">${formattedKey}:</strong>
          <span style="color: #555;"> ${value}</span>
        </p>
      `;
    }

    htmlContent += `
        <hr style="margin-top: 20px; border-color: #ddd;" />
        <p style="color: #999; font-size: 12px;">This email was sent from the Sri Mayyia Caterers website contact form.</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: 'Sri Mayyia Caterers <noreply@srimayyiacaterers.com>',
      to: ['customercare@srimayyiacaterers.com'],
      subject: `New Inquiry: ${data.subject || data.eventType || 'Website Form'} from ${data.name || 'User'}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}

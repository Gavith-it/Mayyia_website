import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sendWhatsAppTemplate } from '@/lib/whatsapp';

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
      if (key === 'formType') continue; // Skip internal fields in display
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

    // 1. Send Email Notification via Resend
    let emailSent = false;
    try {
      const { error } = await resend.emails.send({
        from: 'Sri Mayyia Caterers <noreply@srimayyiacaterers.com>',
        to: ['customercare@srimayyiacaterers.com'],
        subject: `New Inquiry: ${data.subject || data.eventType || 'Website Form'} from ${data.name || 'User'}`,
        html: htmlContent,
      });

      if (error) {
        console.error('Resend email error:', error);
      } else {
        emailSent = true;
      }
    } catch (e) {
      console.error('Failed to dispatch Resend email:', e);
    }

    // 2. Send WhatsApp Notification via Meta Business API
    let whatsappSent = false;
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    if (adminPhone) {
      // Determine what type of form was submitted
      const isBooking = data.formType === 'Booking Form' || !!data.eventType;
      const formTypeLabel = isBooking ? 'Booking Form' : 'Contact Form';

      // Create a nice structured message for parameter {{4}}
      let messageSummary = '';
      if (isBooking) {
        messageSummary = `Event: ${data.eventType || 'Catering'}, Date: ${data.date || 'N/A'}, Time: ${data.time || 'N/A'}, Guests: ${data.guests || 'N/A'}. Requests: ${data.message || 'None'}`;
      } else {
        messageSummary = data.message || 'No message provided.';
      }

      // Send via WhatsApp using the pre-approved template 'inquiry_form'
      // inquiry_form parameters: {{1}} Name, {{2}} Phone, {{3}} Subject, {{4}} Message
      const waResult = await sendWhatsAppTemplate({
        to: adminPhone,
        templateName: 'inquiry_form',
        parameters: [
          data.name || 'Anonymous Customer',
          data.phone || 'No Phone provided',
          formTypeLabel,
          messageSummary
        ]
      });

      if (waResult.success) {
        whatsappSent = true;
        console.log('WhatsApp notification sent successfully to admin!');
      } else {
        console.error('Failed to send WhatsApp notification:', waResult.error);
      }
    }

    // Return success if at least one notification dispatch was successful
    if (emailSent || whatsappSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Notification sent successfully', 
        details: { email: emailSent, whatsapp: whatsappSent } 
      }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: 'Failed to send notifications' }, { status: 500 });
  } catch (error) {
    console.error('Form submission handler error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

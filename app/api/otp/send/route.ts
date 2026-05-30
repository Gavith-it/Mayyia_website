import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendWhatsAppTemplate } from '@/lib/whatsapp';

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Name and phone number are required.' }, { status: 400 });
    }

    // 1. Format the phone number (remove non-digits)
    const formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.length < 10) {
      return NextResponse.json({ success: false, error: 'Invalid phone number format.' }, { status: 400 });
    }

    // 2. Generate a secure random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Cryptographically sign the OTP (stateless verification)
    const expiryDuration = 10 * 60 * 1000; // 10 minutes
    const expires = Date.now() + expiryDuration;
    const dataToHash = `${formattedPhone}:${otp}:${expires}`;
    
    // Use the access token as the signing secret
    const secret = process.env.WHATSAPP_ACCESS_TOKEN || 'sri-mayyia-fallback-otp-secret-key';
    const hash = crypto.createHmac('sha256', secret).update(dataToHash).digest('hex');
    const token = `${expires}.${hash}`;

    // 4. Send the OTP via WhatsApp using the single 'inquiry_form' template workaround
    // inquiry_form parameters: {{1}} Name, {{2}} Phone, {{3}} Subject, {{4}} Message
    const waResult = await sendWhatsAppTemplate({
      to: formattedPhone,
      templateName: 'inquiry_form',
      parameters: [
        'Sri Mayyia Website',              // {{1}} Submitter/System Name
        'Security Verification',           // {{2}} Department/Category
        'One-Time Password (OTP)',         // {{3}} Subject
        `Your verification code is: ${otp}. It is valid for 10 minutes. Please enter this code on the website to access.` // {{4}} Message
      ]
    });

    if (!waResult.success) {
      console.error('Failed to send OTP via WhatsApp:', waResult.error);
      // For development/debugging: log the OTP to server console
      console.log(`[DEV OTP LOG] Code for ${name} (${formattedPhone}): ${otp}`);
      return NextResponse.json({ 
        success: false, 
        error: `Could not send WhatsApp message. ${waResult.error}` 
      }, { status: 500 });
    }

    // 5. Build and send response with secure HTTP-only session cookie
    const response = NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully!' 
    });

    // Set the cryptographic token in a secure HTTP-Only cookie
    response.cookies.set('sri_mayyia_otp_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 600 // 10 minutes in seconds
    });

    return response;
  } catch (error) {
    console.error('OTP Send route error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error sending OTP' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { sendWhatsAppTemplate } from '@/lib/whatsapp';

export async function POST(req: Request) {
  try {
    const { name, phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ success: false, error: 'Phone and OTP code are required.' }, { status: 400 });
    }

    const formattedPhone = phone.replace(/\D/g, '');

    // 1. Get the temporary session cookie
    const cookieStore = cookies();
    const otpSession = cookieStore.get('sri_mayyia_otp_session');

    if (!otpSession) {
      return NextResponse.json({ 
        success: false, 
        error: 'OTP session expired or not found. Please request a new OTP.' 
      }, { status: 400 });
    }

    // 2. Parse the cookie content (expires.hash)
    const [expiresStr, storedHash] = otpSession.value.split('.');
    if (!expiresStr || !storedHash) {
      return NextResponse.json({ success: false, error: 'Invalid OTP session state.' }, { status: 400 });
    }

    const expires = Number(expiresStr);

    // 3. Verify OTP expiration (10 minutes)
    if (Date.now() > expires) {
      return NextResponse.json({ 
        success: false, 
        error: 'OTP has expired. Please request a new OTP.' 
      }, { status: 400 });
    }

    // 4. Cryptographically verify the OTP
    const dataToHash = `${formattedPhone}:${otp}:${expires}`;
    const secret = process.env.WHATSAPP_ACCESS_TOKEN || 'sri-mayyia-fallback-otp-secret-key';
    const computedHash = crypto.createHmac('sha256', secret).update(dataToHash).digest('hex');

    if (computedHash !== storedHash) {
      return NextResponse.json({ success: false, error: 'Incorrect verification code. Please check and try again.' }, { status: 400 });
    }

    // 5. Successful login! Generate secure long-term access cookie (30 days)
    const response = NextResponse.json({ 
      success: true, 
      message: 'OTP verified successfully! Access granted.' 
    });

    // Set client-accessible or server-secure cookie for verification state
    response.cookies.set('sri_mayyia_verified', 'true', {
      httpOnly: false, // Make it readable by client-side to easily hide gate overlay
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
    });

    // Delete the temporary OTP session cookie
    response.cookies.delete('sri_mayyia_otp_session');

    // Send notification to Admin number
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    if (adminPhone) {
      try {
        await sendWhatsAppTemplate({
          to: adminPhone,
          templateName: 'inquiry_form',
          parameters: [
            name || 'Anonymous User',
            phone || 'No Phone',
            'Website Login',
            `The user "${name}" has successfully verified their OTP and logged into the website.`
          ]
        });
      } catch (err) {
        console.error('Failed to notify admin of user login:', err);
      }
    }

    return response;
  } catch (error) {
    console.error('OTP Verification route error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error verifying OTP' }, { status: 500 });
  }
}

interface SendTemplateParams {
  to: string;
  templateName: string;
  languageCode?: string;
  parameters: string[]; // List of values for {{1}}, {{2}}, {{3}}, {{4}}
}

/**
 * Sends a pre-approved WhatsApp message template using Meta's Cloud API.
 */
export async function sendWhatsAppTemplate({
  to,
  templateName,
  languageCode = 'en',
  parameters,
}: SendTemplateParams) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    console.error('WhatsApp API credentials are not set in environment variables.');
    return { success: false, error: 'Credentials missing' };
  }

  // Format recipient phone number: keep only digits
  const formattedTo = to.replace(/\D/g, '');

  // Using Graph API version v20.0 (or v19.0)
  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  const body = {
    messaging_product: 'whatsapp',
    to: formattedTo,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: languageCode,
      },
      components: [
        {
          type: 'body',
          parameters: parameters.map((param) => ({
            type: 'text',
            text: param,
          })),
        },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('WhatsApp Cloud API Error response:', responseData);
      return { success: false, error: responseData.error?.message || 'Failed to send WhatsApp message' };
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error('WhatsApp API request failed:', error);
    return { success: false, error: 'Network error sending WhatsApp message' };
  }
}

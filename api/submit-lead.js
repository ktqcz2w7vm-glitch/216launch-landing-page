import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { businessName, yourName, phoneNumber, email, websiteUrl } = req.body;

        // Validate required fields
        if (!businessName || !yourName || !phoneNumber || !email) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['businessName', 'yourName', 'phoneNumber', 'email']
            });
        }

        // Validate email format
        const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate phone number (basic validation)
        const phoneRegex = /^[ds-()+]+$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        // Create email content
        const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; color: #1a1a1a; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #6E40C9; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 800; }
            .content { background-color: #f7f7f7; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #1a1a1a; margin-top: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Lead from 216 LAUNCH</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Business Name</div>
                <div class="value">${businessName}</div>
              </div>
              <div class="field">
                <div class="label">Contact Name</div>
                <div class="value">${yourName}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value"><a href="tel:${phoneNumber}">${phoneNumber}</a></div>
              </div>
              ${websiteUrl ? `
              <div class="field">
                <div class="label">Current Website</div>
                <div class="value"><a href="${websiteUrl}" target="_blank">${websiteUrl}</a></div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Submitted from 216launch.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

        const emailText = `
New Lead from 216 LAUNCH

Business Name: ${businessName}
Contact Name: ${yourName}
Email: ${email}
Phone Number: ${phoneNumber}
${websiteUrl ? `Current Website: ${websiteUrl}` : ''}

Submitted from 216launch.com
    `;

        // Send email using Resend
        const data = await resend.emails.send({
            from: '216 LAUNCH <onboarding@resend.dev>', // You'll update this with your domain later
            to: [process.env.RECIPIENT_EMAIL],
            subject: `New Lead: ${businessName} - ${yourName}`,
            html: emailHtml,
            text: emailText,
        });

        console.log('Email sent successfully:', data);

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Form submitted successfully! We\'ll be in touch soon.',
            id: data.id
        });

    } catch (error) {
        console.error('Error processing form submission:', error);

        return res.status(500).json({
            error: 'Failed to process submission',
            message: error.message
        });
    }
}

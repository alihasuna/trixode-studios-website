import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with fallback for build time
const resend = new Resend(process.env.RESEND_API_KEY || 'fallback-key-for-build')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if API key is properly configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'fallback-key-for-build') {
      console.error('Resend API key not configured')
      return NextResponse.json({ 
        error: 'Email service not configured. Please contact us directly at ceo@trixode-studios.com' 
      }, { status: 500 })
    }

    // Send notification email to you
    const notificationEmail = await resend.emails.send({
      from: 'contact@trixode-studios.com',
      to: 'hussienballouk@protonmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from the Trixode Studios contact form.
          </p>
        </div>
      `,
    })

    // Send branded auto-reply to the user
    const autoReplyEmail = await resend.emails.send({
      from: 'Trixode Studios <noreply@trixode-studios.com>',
      to: email,
      subject: 'Message received - Trixode Studios',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message received - Trixode Studios</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #e5e7eb;">
                      <h1 style="color: #111827; font-size: 24px; font-weight: 600; margin: 0;">Trixode Studios</h1>
                      <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0;">Message Received</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 32px;">
                      <p style="color: #111827; font-size: 16px; line-height: 1.5; margin: 0 0 16px;">
                        Hi ${name},
                      </p>
                      
                      <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 24px;">
                        Thank you for contacting us. We have received your message and will respond within 24 hours.
                      </p>
                      
                      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin: 24px 0;">
                        <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px; font-weight: 500;">Your message:</p>
                        <p style="color: #111827; font-size: 14px; margin: 0; line-height: 1.4;">${message}</p>
                      </div>
                      
                      <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 24px 0 0;">
                        Best regards,<br>
                        <strong style="color: #111827;">Trixode Studios Team</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 32px; text-align: center; background: #f9fafb; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px;">
                        <strong>Trixode Studios</strong>
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        Victoria, BC, Canada • Quito, Ecuador
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0;">
                        This is an automated confirmation email.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@trixode-studios.com>',
        'X-Priority': '3',
        'X-Mailer': 'Trixode Studios Contact Form',
      },
    })

    console.log('Emails sent successfully:', { notificationEmail, autoReplyEmail })

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully! Check your email for confirmation.' 
    }, { status: 200 })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ 
      error: 'Failed to send message. Please try again or email us directly at ceo@trixode-studios.com' 
    }, { status: 500 })
  }
} 
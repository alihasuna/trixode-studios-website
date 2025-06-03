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
      subject: 'Thank you for contacting Trixode Studios',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Trixode Studios</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a1a; font-family: Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a1a;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)); border-radius: 16px; overflow: hidden; border: 1px solid rgba(59, 130, 246, 0.2);">
                  
                  <!-- Header with Hexagon Logo -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));">
                      <svg width="48" height="48" viewBox="0 0 48 48" style="margin-bottom: 16px;">
                        <polygon points="24,8 36,16 36,32 24,40 12,32 12,16" fill="none" stroke="#3b82f6" stroke-width="2"/>
                        <circle cx="24" cy="24" r="2" fill="#3b82f6"/>
                        <line x1="24" y1="24" x2="24" y2="8" stroke="#60a5fa" stroke-width="1"/>
                        <line x1="24" y1="24" x2="36" y2="16" stroke="#60a5fa" stroke-width="1"/>
                        <line x1="24" y1="24" x2="36" y2="32" stroke="#60a5fa" stroke-width="1"/>
                        <line x1="24" y1="24" x2="24" y2="40" stroke="#60a5fa" stroke-width="1"/>
                        <line x1="24" y1="24" x2="12" y2="32" stroke="#60a5fa" stroke-width="1"/>
                        <line x1="24" y1="24" x2="12" y2="16" stroke="#60a5fa" stroke-width="1"/>
                      </svg>
                      <h1 style="color: #ffffff; font-size: 32px; font-weight: 900; margin: 0; letter-spacing: -0.5px;">TRIXODE STUDIOS</h1>
                      <p style="color: #60a5fa; font-size: 16px; margin: 8px 0 0; font-weight: 600;">Building the Future of Software</p>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #ffffff; font-size: 24px; font-weight: 900; margin: 0 0 20px;">Thank you for reaching out!</h2>
                      
                      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Hi <strong style="color: #ffffff;">${name}</strong>,
                      </p>
                      
                      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        We've successfully received your message and are excited to learn about your project! Our team will review your inquiry and get back to you within <strong style="color: #60a5fa;">24 hours</strong>.
                      </p>
                      
                      <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                        <p style="color: #e5e7eb; font-size: 14px; margin: 0 0 10px; font-weight: 600;">Your Message:</p>
                        <p style="color: #d1d5db; font-size: 14px; margin: 0; line-height: 1.5;">${message}</p>
                      </div>
                      
                      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                        In the meantime, feel free to explore our <a href="https://trixode-studios.com/projects" style="color: #60a5fa; text-decoration: none; font-weight: 600;">latest projects</a> or learn more <a href="https://trixode-studios.com/about" style="color: #60a5fa; text-decoration: none; font-weight: 600;">about our team</a>.
                      </p>
                      
                      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6; margin: 20px 0 0;">
                        Best regards,<br>
                        <strong style="color: #ffffff;">The Trixode Studios Team</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; text-align: center; background: rgba(59, 130, 246, 0.05); border-top: 1px solid rgba(59, 130, 246, 0.1);">
                      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
                        <strong>Trixode Studios</strong><br>
                        Victoria, BC, Canada & Quito, Ecuador
                      </p>
                      <p style="color: #6b7280; font-size: 12px; margin: 0;">
                        This is an automated response. Please don't reply to this email.
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
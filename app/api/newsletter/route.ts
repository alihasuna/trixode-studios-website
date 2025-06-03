import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'Trixode Studios <newsletter@trixode-studios.com>',
      to: [email],
      subject: 'Welcome to Trixode Studios Newsletter! 🚀',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%); color: white; padding: 40px 20px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #00d4ff; font-size: 32px; font-weight: 900; margin: 0; text-transform: uppercase;">
              Welcome to Trixode Studios
            </h1>
            <p style="color: #a0a0a0; font-size: 18px; margin: 10px 0 0 0;">
              Building the Future of Software
            </p>
          </div>
          
          <div style="background: rgba(0, 212, 255, 0.1); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 12px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #00d4ff; font-size: 24px; font-weight: 800; margin: 0 0 15px 0;">
              🎉 You're In!
            </h2>
            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.6; margin: 0;">
              Thank you for subscribing to our newsletter! You'll now receive the latest insights on:
            </p>
            <ul style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 15px 0; padding-left: 20px;">
              <li>🤖 AI & Research Tools</li>
              <li>💻 Software Development</li>
              <li>🔬 Research Impact</li>
              <li>⚡ Performance Optimization</li>
              <li>🌐 Open Source Projects</li>
            </ul>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://trixode-studios.com/blog" style="background: linear-gradient(135deg, #0066cc 0%, #00d4ff 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 10px; font-weight: 800; font-size: 16px; display: inline-block; text-transform: uppercase;">
              Explore Our Blog
            </a>
          </div>

          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center;">
            <p style="color: #a0a0a0; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong style="color: #00d4ff;">Hussien Ballouk</strong><br>
              CEO & Founder, Trixode Studios
            </p>
          </div>
        </div>
      `,
    })

    // Also send notification to yourself about new subscriber
    await resend.emails.send({
      from: 'Newsletter <newsletter@trixode-studios.com>',
      to: ['ceo@trixode-studios.com'],
      subject: `🎉 New Newsletter Subscriber: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0066cc;">New Newsletter Subscriber!</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Source:</strong> Blog Newsletter Signup</p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
} 
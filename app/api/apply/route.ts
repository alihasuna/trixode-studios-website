import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 'fallback-key-for-build')

interface ApplicationData {
  fullName: string
  email: string
  location: string
  portfolio: string
  linkedin: string
  languages: string[]
  frameworks: string[]
  aiTools: string[]
  agenticTools: string[]
  yearsExperience: string
  bestProject: string
  agenticExperience: string
  mcpKnowledge: string
  agentProject: string
  cliToolsExperience: string
  securityExperience: string
  idealWorkday: string
  handleAmbiguity: string
  motivation: string
  communicationPref: string
  remoteExperience: string
  challengeType: string
  challengeContent: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ApplicationData = await request.json()
    const {
      fullName,
      email,
      location,
      portfolio,
      linkedin,
      languages,
      frameworks,
      aiTools,
      agenticTools,
      yearsExperience,
      bestProject,
      agenticExperience,
      mcpKnowledge,
      agentProject,
      cliToolsExperience,
      securityExperience,
      idealWorkday,
      handleAmbiguity,
      motivation,
      communicationPref,
      remoteExperience,
      challengeType,
      challengeContent,
    } = body

    // Validate required fields
    if (!fullName || !email || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check API key
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'fallback-key-for-build') {
      console.error('Resend API key not configured')
      return NextResponse.json({
        error: 'Email service not configured. Please contact us directly at ceo@trixode-studios.com'
      }, { status: 500 })
    }

    // Format challenge type label
    const challengeTypeLabel = {
      walkthrough: 'Written Walkthrough',
      video: 'Video/Demo Link',
      github: 'GitHub Repository',
    }[challengeType] || challengeType

    // Send notification email to admin
    await resend.emails.send({
      from: 'careers@trixode-studios.com',
      to: 'hussienballouk@protonmail.com',
      subject: `🚀 New Job Application: ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Courier New', monospace; background: #0a0a1a; color: #fff; padding: 40px; }
            .container { max-width: 700px; margin: 0 auto; }
            h1 { color: #22d3ee; font-size: 28px; margin-bottom: 30px; text-transform: uppercase; }
            h2 { color: #22d3ee; font-size: 18px; margin: 30px 0 15px; text-transform: uppercase; border-bottom: 2px solid #22d3ee; padding-bottom: 10px; }
            .field { margin: 15px 0; }
            .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .value { color: #fff; font-size: 16px; margin-top: 5px; }
            .tag { display: inline-block; background: linear-gradient(135deg, #3b82f6, #22d3ee); color: #fff; padding: 4px 12px; margin: 4px 4px 4px 0; font-weight: bold; font-size: 12px; border-radius: 4px; }
            .box { border: 2px solid #22d3ee30; padding: 20px; margin: 15px 0; background: #0f172a; border-radius: 8px; }
            .highlight { color: #22d3ee; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Application Received</h1>
            
            <h2>Personal Information</h2>
            <div class="field">
              <div class="label">Full Name</div>
              <div class="value highlight">${fullName}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #22d3ee;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Location</div>
              <div class="value">${location}</div>
            </div>
            ${portfolio ? `
            <div class="field">
              <div class="label">Portfolio/GitHub</div>
              <div class="value"><a href="${portfolio}" style="color: #22d3ee;">${portfolio}</a></div>
            </div>
            ` : ''}
            ${linkedin ? `
            <div class="field">
              <div class="label">LinkedIn</div>
              <div class="value"><a href="${linkedin}" style="color: #22d3ee;">${linkedin}</a></div>
            </div>
            ` : ''}

            <h2>Technical Skills</h2>
            <div class="field">
              <div class="label">Languages</div>
              <div class="value">
                ${languages.map(l => `<span class="tag">${l}</span>`).join('')}
              </div>
            </div>
            ${frameworks.length > 0 ? `
            <div class="field">
              <div class="label">Frameworks</div>
              <div class="value">
                ${frameworks.map(f => `<span class="tag">${f}</span>`).join('')}
              </div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">AI Tools</div>
              <div class="value">
                ${aiTools.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
            <div class="field">
              <div class="label">Experience</div>
              <div class="value highlight">${yearsExperience}</div>
            </div>
            ${bestProject ? `
            <div class="field">
              <div class="label">Best Project</div>
              <div class="box">${bestProject.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}

            <h2>Agentic AI & MCP</h2>
            ${agenticTools && agenticTools.length > 0 ? `
            <div class="field">
              <div class="label">Agentic AI Tools</div>
              <div class="value">
                ${agenticTools.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Agentic AI Experience</div>
              <div class="box">${agenticExperience ? agenticExperience.replace(/\n/g, '<br>') : 'Not provided'}</div>
            </div>
            ${mcpKnowledge ? `
            <div class="field">
              <div class="label">MCP Knowledge</div>
              <div class="box">${mcpKnowledge.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            ${agentProject ? `
            <div class="field">
              <div class="label">Agent Project Ideas</div>
              <div class="box">${agentProject.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            ${cliToolsExperience ? `
            <div class="field">
              <div class="label">CLI Tools & Automation Experience</div>
              <div class="box">${cliToolsExperience.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            ${securityExperience ? `
            <div class="field">
              <div class="label">Security & Pen Testing Experience</div>
              <div class="box">${securityExperience.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}

            <h2>Mindset & Culture</h2>
            <div class="field">
              <div class="label">Ideal Workday</div>
              <div class="box">${idealWorkday.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="field">
              <div class="label">Handling Ambiguity</div>
              <div class="box">${handleAmbiguity.replace(/\n/g, '<br>')}</div>
            </div>
            ${motivation ? `
            <div class="field">
              <div class="label">Motivation</div>
              <div class="box">${motivation.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Communication Preference</div>
              <div class="value">${communicationPref}</div>
            </div>
            ${remoteExperience ? `
            <div class="field">
              <div class="label">Remote Experience</div>
              <div class="box">${remoteExperience.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}

            <h2>Vibe Coding Challenge</h2>
            <div class="field">
              <div class="label">Challenge Type</div>
              <div class="value highlight">${challengeTypeLabel}</div>
            </div>
            <div class="field">
              <div class="label">Response</div>
              <div class="box">
                ${challengeType === 'walkthrough'
          ? challengeContent.replace(/\n/g, '<br>')
          : `<a href="${challengeContent}" style="color: #22d3ee;">${challengeContent}</a>`
        }
              </div>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 3px solid #333; color: #666; font-size: 12px;">
              Application submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Send confirmation email to applicant
    await resend.emails.send({
      from: 'Trixode Studios <careers@trixode-studios.com>',
      to: email,
      subject: 'Application Received - Trixode Studios',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #000; font-family: 'Courier New', Courier, monospace;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: #000; border: 4px solid #fff;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px; text-align: center; border-bottom: 4px solid #fff;">
                      <h1 style="color: #22d3ee; font-size: 32px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
                        APPLICATION RECEIVED
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #fff; font-size: 18px; line-height: 1.6; margin: 0 0 24px;">
                        Hey <span style="color: #22d3ee; font-weight: bold;">${fullName}</span>,
                      </p>
                      
                      <p style="color: #aaa; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        Thanks for applying to join Trixode Studios. We've received your application and are excited to review it.
                      </p>
                      
                      <div style="background: #111; border: 4px solid #333; padding: 24px; margin: 32px 0;">
                        <p style="color: #22d3ee; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px;">
                          What's Next?
                        </p>
                        <p style="color: #fff; font-size: 16px; line-height: 1.6; margin: 0;">
                          We'll review your application and get back to you within <strong style="color: #22d3ee;">48 hours</strong>. If we think you're a good fit, we'll schedule a call to chat more.
                        </p>
                      </div>
                      
                      <p style="color: #aaa; font-size: 16px; line-height: 1.6; margin: 24px 0 0;">
                        In the meantime, feel free to check out our work at <a href="https://trixode-studios.com" style="color: #22d3ee;">trixode-studios.com</a>.
                      </p>
                      
                      <p style="color: #fff; font-size: 16px; line-height: 1.6; margin: 32px 0 0;">
                        — The Trixode Team
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 32px; text-align: center; background: #111; border-top: 4px solid #333;">
                      <p style="color: #666; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                        TRIXODE STUDIOS
                      </p>
                      <p style="color: #444; font-size: 11px; margin: 8px 0 0;">
                        Victoria, BC, Canada • Quito, Ecuador
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

    console.log('Application received and emails sent:', { fullName, email })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!'
    }, { status: 200 })

  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json({
      error: 'Failed to submit application. Please try again or email us at ceo@trixode-studios.com'
    }, { status: 500 })
  }
}

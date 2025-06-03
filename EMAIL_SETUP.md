# Email Setup Instructions

## Contact Form Email Configuration

The contact form sends emails to `hussienballouk@protonmail.com` AND sends a branded auto-reply to the user.

## Resend (Recommended for Auto-Reply Feature)

**✅ BEST CHOICE** for your requirements because it supports:
- Branded email templates with your hexagon logo
- Professional auto-reply emails to users
- Dual email sending (notification + auto-reply)
- Better deliverability than Gmail/EmailJS

### Setup Steps:

1. **Create a Resend Account**
   - Go to [https://resend.com](https://resend.com)
   - Sign up for a free account (3,000 emails/month)

2. **Verify Your Domain**
   - Add and verify `trixode-studios.com` in your Resend dashboard
   - Follow their DNS configuration instructions
   - Verify both `contact@trixode-studios.com` and `noreply@trixode-studios.com`

3. **Get Your API Key**
   - Go to [https://resend.com/api-keys](https://resend.com/api-keys)
   - Create a new API key

4. **Set Environment Variable**
   - Create a `.env.local` file in the root directory:
   ```
   RESEND_API_KEY=your_actual_api_key_here
   ```

5. **Deploy to Vercel**
   - Add the environment variable in your Vercel dashboard
   - Go to Project Settings > Environment Variables
   - Add `RESEND_API_KEY` with your API key value

### What Happens When Someone Contacts You:

1. **You receive**: Professional notification email with their message
2. **User receives**: Branded auto-reply email with:
   - Your hexagon logo
   - Trixode Studios branding
   - Confirmation their message was received
   - 24-hour response time promise
   - Links to your projects and about page

## Alternative Options (Less Recommended)

### Option 2: EmailJS
- ✅ Easy setup, works with Cloudflare
- ❌ No professional auto-reply feature
- ❌ Limited template customization

### Option 3: Gmail SMTP
- ✅ Free with your existing Gmail
- ❌ More complex setup
- ❌ Limited branded template support

### Contact Information Displayed:

- **Email**: ceo@trixode-studios.com
- **Locations**: Victoria, BC, Canada & Quito, Ecuador
- **Office Address**: 341 Quebec St, Victoria BC (shown on Google Maps)

### Features:

- ✅ Form validation
- ✅ Dual email sending (notification + auto-reply)
- ✅ Branded email templates with hexagon logo
- ✅ Professional auto-reply with company branding
- ✅ Error handling and user feedback
- ✅ Google Maps integration for office location
- ✅ Works perfectly with Cloudflare

### Recommendation:

**Use Resend** - It's the only option that provides professional branded auto-reply emails with your company's visual identity, which is exactly what you need for a professional impression.

### Testing:

Once configured, test the contact form by:
1. Filling out the form on `/contact`
2. Checking that emails arrive at hussienballouk@protonmail.com
3. Verifying the email content includes all form fields

### Notes:

- The email will appear to come from `contact@trixode-studios.com`
- Make sure this sending address is verified in your Resend account
- Free Resend accounts have sending limits, upgrade if needed for production use 
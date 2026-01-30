# 216 LAUNCH Landing Page

Premium landing page for an AI website agency targeting Cleveland bars and coffee shops.

## 🚀 Features

- **Modern Design**: Clean Stripe/Linear aesthetic with violet (#6E40C9) and navy (#0A2540) color scheme
- **Contact Form**: Integrated form with serverless backend
- **Email Notifications**: Automatic email alerts via Resend API
- **Fully Responsive**: Mobile-first design with smooth animations
- **Zero Cost Hosting**: Deployed on Vercel's free tier

## 📋 Prerequisites

Before deploying, you'll need:

1. **Node.js** installed (v18 or higher)
2. **Vercel account** (free) - [Sign up here](https://vercel.com/signup)
3. **Resend account** (free) - [Sign up here](https://resend.com/signup)

## 🛠️ Setup Instructions

### 1. Install Node.js (if not already installed)

Check if Node.js is installed:
```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to **API Keys** in the dashboard
4. Click **Create API Key**
5. Copy your API key (starts with `re_`)

### 4. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Resend API key:
```
RESEND_API_KEY=re_your_actual_api_key_here
RECIPIENT_EMAIL=Holisticimageryllc@gmail.com
```

### 5. Test Locally

Install Vercel CLI:
```bash
npm install -g vercel
```

Run the development server:
```bash
vercel dev
```

Open [http://localhost:3000](http://localhost:3000) and test the form submission.

### 6. Deploy to Vercel

Deploy to production:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **Project name?** 216launch (or your preferred name)
- **Directory?** ./
- **Override settings?** No

### 7. Add Environment Variables to Vercel

After deployment, add your environment variables:

```bash
vercel env add RESEND_API_KEY
```

Paste your Resend API key when prompted.

```bash
vercel env add RECIPIENT_EMAIL
```

Enter: `Holisticimageryllc@gmail.com`

### 8. Redeploy with Environment Variables

```bash
vercel --prod
```

## 🎨 Customization

### Update Email Template

Edit `api/submit-lead.js` to customize the email notification format.

### Change Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --color-violet: #6E40C9;
    --color-navy: #0A2540;
}
```

### Add Custom Domain

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your custom domain
5. Update DNS records as instructed

## 📧 Email Configuration

The default sender email is `onboarding@resend.dev`. To use your own domain:

1. Add and verify your domain in Resend
2. Update the `from` field in `api/submit-lead.js`:
   ```javascript
   from: '216 LAUNCH <hello@yourdomain.com>'
   ```

## 🧪 Testing

Test the form submission:
1. Fill out the contact form
2. Click "Get Free Audit"
3. Check your email (Holisticimageryllc@gmail.com) for the notification

## 📊 Analytics (Optional)

To track form submissions with Google Analytics:

1. Add Google Analytics to `index.html`
2. The form already includes gtag tracking code
3. Events will be tracked as `form_submission`

## 💰 Cost Breakdown

- **Hosting (Vercel)**: FREE
- **Email (Resend)**: FREE (3,000 emails/month)
- **Custom Domain**: ~$12/year (optional)

**Total**: $0/month

## 🆘 Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify environment variables are set in Vercel
- Check Resend API key is valid

**Not receiving emails?**
- Check spam folder
- Verify RECIPIENT_EMAIL is correct in Vercel env vars
- Check Resend dashboard for delivery logs

**Local development not working?**
- Make sure `.env` file exists with correct values
- Run `vercel dev` instead of opening HTML directly
- Check that port 3000 is not in use

## 📞 Support

For questions or issues, contact: info@216launch.com

## 📄 License

MIT License - feel free to use this for your own projects!

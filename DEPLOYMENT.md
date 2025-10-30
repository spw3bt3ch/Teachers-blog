# Deployment Guide - TTribe to Vercel

This guide will help you deploy TTribe to Vercel.

## Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas account with your database connection string

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - TTribe blog for Nigerian teachers"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/ttribe.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Project**
   - Click "New Project"
   - Select your GitHub repository (TTribe)
   - Click "Import"

3. **Configure Environment Variables**
   
   Before deploying, add these environment variables in Vercel:
   
   - **MONGODB_URI**: Your MongoDB connection string
     ```
     mongodb://atlas-sql-672227ebf323cb3d23ae31e3-pkzfi.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin
     ```
   
   - **NEXTAUTH_SECRET**: Generate a secret key:
     ```bash
     openssl rand -base64 32
     ```
     Copy the output and paste it as the value for `NEXTAUTH_SECRET`
   
   - **NEXTAUTH_URL**: Leave this blank for now (we'll update after first deploy)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### 3. Update NEXTAUTH_URL

After the first deployment completes:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add/Update `NEXTAUTH_URL` with your production URL:
   ```
   https://your-project-name.vercel.app
   ```
4. Redeploy the application (click "Redeploy" in the Deployments tab)

### 4. Verify Deployment

1. Visit your deployed URL (e.g., `https://your-project.vercel.app`)
2. Test the following:
   - Home page loads
   - Registration works
   - Login works
   - Posts can be created
   - Comments can be posted

## Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://...` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | (32+ character random string) |
| `NEXTAUTH_URL` | Your production URL | `https://your-app.vercel.app` |

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation succeeds locally
- Check Vercel build logs for specific errors

### Database Connection Issues

- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (should allow all IPs: 0.0.0.0/0)
- Verify database user has correct permissions

### Authentication Not Working

- Ensure `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your production URL exactly
- Clear browser cookies and try again

### Environment Variables Not Loading

- Restart the deployment after adding environment variables
- Check variable names are exact (case-sensitive)
- Ensure variables are added to "Production" environment

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to your custom domain

## Monitoring

- Check Vercel dashboard for deployment status
- View function logs in Vercel dashboard
- Monitor MongoDB Atlas for database performance

## Need Help?

- Check Vercel documentation: https://vercel.com/docs
- Next.js documentation: https://nextjs.org/docs
- MongoDB Atlas documentation: https://docs.atlas.mongodb.com

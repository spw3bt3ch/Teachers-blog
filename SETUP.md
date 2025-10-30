# Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://atlas-sql-672227ebf323cb3d23ae31e3-pkzfi.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
```

### Generating NEXTAUTH_SECRET

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the output and paste it as the value for `NEXTAUTH_SECRET`.

### For Production (Vercel)

When deploying to Vercel, use your production URL:

```env
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file:**
   - Copy the environment variables above
   - Replace `MONGODB_URI` with your actual connection string
   - Generate and set `NEXTAUTH_SECRET`
   - Set `NEXTAUTH_URL` to `http://localhost:3000` for local development

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## First User Registration

1. Navigate to `/auth/register`
2. Create your first account
3. This account will be the first teacher on the platform

## Database Setup

The application will automatically create the necessary collections in MongoDB when you:
- Register a user
- Create a post
- Post a comment

No manual database setup is required!

## Troubleshooting

### MongoDB Connection Issues

- Verify your `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (should allow all IPs: `0.0.0.0/0`)
- Ensure your database user has read/write permissions

### Authentication Not Working

- Ensure `NEXTAUTH_SECRET` is set (minimum 32 characters)
- Verify `NEXTAUTH_URL` matches your current URL exactly
- Clear browser cookies and try again

### Build Errors

- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Run `npm run build` to check for errors

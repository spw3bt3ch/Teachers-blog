<<<<<<< HEAD
# TTribe - Nigerian Teachers Blog

A vibrant, interactive community blog platform specifically designed for Nigerian teachers and educators to share knowledge, resources, and connect with peers.

## Features

- 📝 **Rich Blog Posts** - Create and publish engaging blog posts with a rich text editor
- 💬 **Interactive Comments** - Real-time comment system with nested replies
- 👥 **User Profiles** - Teacher profiles with school, subject, and experience information
- 🏷️ **Categories & Tags** - Organize content by categories and tags
- 🔍 **Search Functionality** - Full-text search across all posts
- ⚡ **Real-time Updates** - Live comment updates and notifications
- 🔐 **Authentication** - Secure user authentication with NextAuth.js
- 📱 **Responsive Design** - Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB (MongoDB Atlas)
- **ORM**: Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Rich Text Editor**: Tiptap
- **Forms**: React Hook Form
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account (or local MongoDB instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd TTribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

   Generate `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Your secret key (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your Vercel deployment URL (will be provided after first deploy)

5. Click "Deploy"

### Step 3: Update NEXTAUTH_URL

After the first deployment:
1. Go to your project settings on Vercel
2. Update `NEXTAUTH_URL` to your production URL: `https://your-project.vercel.app`
3. Redeploy

## Project Structure

```
TTribe/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication routes
│   │   ├── posts/           # Blog post routes
│   │   └── comments/        # Comment routes
│   ├── auth/                # Authentication pages
│   ├── posts/               # Blog post pages
│   ├── dashboard/           # Dashboard pages
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── blog/               # Blog components
│   ├── comments/           # Comment components
│   └── layout/             # Layout components
├── lib/                     # Utilities and helpers
│   ├── mongodb.ts          # MongoDB connection
│   └── auth.ts             # NextAuth configuration
├── models/                  # Mongoose models
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## API Routes

- `GET /api/posts` - Get all posts (with pagination and filters)
- `POST /api/posts` - Create a new post
- `GET /api/posts/[slug]` - Get a specific post
- `PATCH /api/posts/[slug]` - Update a post
- `DELETE /api/posts/[slug]` - Delete a post
- `GET /api/comments?postId=...` - Get comments for a post
- `POST /api/comments` - Create a new comment
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

## Database Models

- **User**: User accounts with teacher information
- **Post**: Blog posts with content, categories, and tags
- **Comment**: Comments with nested reply support
- **Category**: Post categories
- **Tag**: Post tags
- **Reaction**: Likes and reactions on posts/comments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, email support@ttribe.com or create an issue in the repository.

---

Built with ❤️ for Nigerian Teachers
=======
# Teachers-blog
This is a blog meant for Nigerian Teachers and Educators
>>>>>>> cfa3a97c9f84b596d412414b37a504d45794cd06

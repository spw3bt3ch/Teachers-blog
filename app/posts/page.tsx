import { Suspense } from 'react';
import PostCard from '@/components/blog/PostCard';
import PostList from '@/components/blog/PostList';

async function getPosts(page: number = 1) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000');
    const res = await fetch(
      `${baseUrl}/api/posts?page=${page}&limit=12`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return { posts: [], pagination: { page: 1, total: 0, pages: 0 } };
    }

    return await res.json();
  } catch (error) {
    return { posts: [], pagination: { page: 1, total: 0, pages: 0 } };
  }
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const data = await getPosts(page);
  const { posts, pagination } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Posts</h1>
          <p className="text-gray-600">Discover articles from our community of educators</p>
        </div>

        <Suspense fallback={<div>Loading posts...</div>}>
          <PostList initialPosts={posts} initialPagination={pagination} />
        </Suspense>
      </div>
    </div>
  );
}

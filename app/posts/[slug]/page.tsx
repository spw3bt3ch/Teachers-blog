import { notFound } from 'next/navigation';
import PostContent from '@/components/blog/PostContent';
import CommentSection from '@/components/comments/CommentSection';

async function getPost(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/posts/${slug}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PostContent post={post} />
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { formatRelativeTime } from '@/lib/utils';
import { Calendar, Eye, User } from 'lucide-react';

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    author: {
      name: string;
      username: string;
      image?: string;
    };
    category?: {
      name: string;
      slug: string;
    };
    createdAt: string;
    views: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="card hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
        {post.category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full">
              {post.category.name}
            </span>
          </div>
        )}
        <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatRelativeTime(post.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{post.views}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

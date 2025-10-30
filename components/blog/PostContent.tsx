'use client';

import { formatDate } from '@/lib/utils';
import { Calendar, Eye, User, Tag } from 'lucide-react';
import Link from 'next/link';

interface PostContentProps {
  post: {
    _id: string;
    title: string;
    content: string;
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
    tags?: Array<{
      _id?: string;
      name: string;
      slug: string;
    }>;
    createdAt: string;
    views: number;
  };
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <article className="card mb-8">
      {post.category && (
        <div className="mb-4">
          <Link
            href={`/categories/${post.category.slug}`}
            className="inline-block px-3 py-1 text-sm font-semibold bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
          >
            {post.category.name}
          </Link>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

      {post.excerpt && (
        <p className="text-xl text-gray-600 mb-6 italic border-l-4 border-primary-500 pl-4">
          {post.excerpt}
        </p>
      )}

      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <Link
            href={`/profile/${post.author.username}`}
            className="hover:text-primary-600 transition-colors"
          >
            {post.author.name}
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>{post.views} views</span>
        </div>
      </div>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <Tag className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag._id || tag.slug}
                href={`/tags/${tag.slug}`}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

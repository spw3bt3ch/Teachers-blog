'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import Link from 'next/link';

interface PostListProps {
  initialPosts: any[];
  initialPagination: {
    page: number;
    pages: number;
    total: number;
  };
}

export default function PostList({ initialPosts, initialPagination }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?page=${page}&limit=12`);
      const data = await res.json();
      setPosts(data.posts);
      setPagination(data.pagination);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No posts found. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => loadPage(pagination.page - 1)}
            disabled={pagination.page === 1 || loading}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => loadPage(pagination.page + 1)}
            disabled={pagination.page === pagination.pages || loading}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

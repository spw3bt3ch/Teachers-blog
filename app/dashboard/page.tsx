'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { BookOpen, Plus, Edit, User } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/dashboard/posts/create"
            className="card hover:shadow-lg transition-shadow duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-4 rounded-lg group-hover:bg-primary-200 transition-colors">
                <Plus className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Create New Post</h3>
                <p className="text-sm text-gray-600">Share your knowledge with the community</p>
              </div>
            </div>
          </Link>

          <Link
            href="/profile"
            className="card hover:shadow-lg transition-shadow duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-4 rounded-lg group-hover:bg-primary-200 transition-colors">
                <User className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">View Profile</h3>
                <p className="text-sm text-gray-600">Manage your profile and settings</p>
              </div>
            </div>
          </Link>

          <Link
            href="/posts"
            className="card hover:shadow-lg transition-shadow duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-4 rounded-lg group-hover:bg-primary-200 transition-colors">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Browse Posts</h3>
                <p className="text-sm text-gray-600">Explore community content</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookOpen, User, LogOut, LogIn, PenTool } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">TTribe</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/posts" className="text-gray-700 hover:text-primary-600 transition-colors">
              Posts
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">
              Categories
            </Link>
            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-red-600 hover:text-red-700 transition-colors font-semibold"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard/posts/create"
                  className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <PenTool className="h-4 w-4" />
                  <span className="hidden sm:inline">Write</span>
                </Link>
                <Link
                  href={`/profile/${session.user.username}`}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{session.user.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <LogIn className="h-5 w-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

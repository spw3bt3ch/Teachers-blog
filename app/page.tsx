import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PostCard from '@/components/blog/PostCard';
import { BookOpen, Users, Lightbulb, TrendingUp, Award, MessageSquare, Zap, CheckCircle } from 'lucide-react';

async function getFeaturedPosts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/posts?featured=true&limit=3`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { posts: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return { posts: [] };
  }
}

async function getRecentPosts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/posts?limit=6`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { posts: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return { posts: [] };
  }
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const [featuredData, recentData] = await Promise.all([
    getFeaturedPosts(),
    getRecentPosts(),
  ]);

  const featuredPosts = featuredData.posts || [];
  const recentPosts = recentData.posts || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Welcome to <span className="text-primary-200">TTribe</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              A vibrant professional community platform for Nigerian teachers and educators to share knowledge, 
              collaborate, and grow together
            </p>
            
            {session ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/posts"
                  className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Explore Posts
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-primary-500 text-white rounded-xl font-bold text-lg hover:bg-primary-400 transition-all duration-300 transform hover:scale-105 border-2 border-white/30"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/auth/register"
                  className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Join Our Community
                </Link>
                <Link
                  href="/auth/login"
                  className="px-8 py-4 bg-primary-500 text-white rounded-xl font-bold text-lg hover:bg-primary-400 transition-all duration-300 transform hover:scale-105 border-2 border-white/30"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-primary-600 mb-2">Community</h3>
              <p className="text-gray-600">Active Educators</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-blue-600 mb-2">Knowledge</h3>
              <p className="text-gray-600">Shared Resources</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">Discussions</h3>
              <p className="text-gray-600">Active Conversations</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-purple-600 mb-2">Growth</h3>
              <p className="text-gray-600">Continuous Learning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Join TTribe?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with fellow educators, share insights, and build a stronger teaching community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Share Knowledge</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your teaching experiences, innovative methodologies, and valuable resources with a community that understands and appreciates your expertise.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Connect & Learn</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with teachers across Nigeria, learn from diverse perspectives, and gain insights that will enhance your teaching practice.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Stay Updated</h3>
              <p className="text-gray-600 leading-relaxed">
                Get the latest news, educational policies, teaching trends, and professional development opportunities in Nigerian education.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Interactive Discussions</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage in meaningful conversations through our real-time comment system. Ask questions, share experiences, and get instant feedback.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Recognition</h3>
              <p className="text-gray-600 leading-relaxed">
                Build your professional profile, showcase your expertise, and gain recognition within the Nigerian teaching community.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Quality Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Access high-quality, curated content from experienced educators. Every post is reviewed and organized for easy discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-600 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Featured Posts</h2>
              </div>
              <Link
                href="/posts"
                className="text-primary-600 hover:text-primary-700 font-semibold text-lg flex items-center space-x-2 group"
              >
                <span>View All</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post: any) => (
                <div key={post._id} className="transform hover:scale-105 transition-transform duration-300">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold text-gray-900">Latest Discussions</h2>
              <Link
                href="/posts"
                className="text-primary-600 hover:text-primary-700 font-semibold text-lg flex items-center space-x-2 group"
              >
                <span>View All</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: any) => (
                <div key={post._id} className="transform hover:scale-105 transition-transform duration-300">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Enhanced */}
      {!session && (
        <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of Nigerian educators who are already sharing knowledge, 
              connecting with peers, and growing their professional network
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="px-10 py-5 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Started Today
              </Link>
              <Link
                href="/auth/login"
                className="px-10 py-5 bg-primary-500 text-white rounded-xl font-bold text-lg hover:bg-primary-400 transition-all duration-300 transform hover:scale-105 border-2 border-white/30"
              >
                Sign In to Your Account
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
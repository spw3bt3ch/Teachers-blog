'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Users, BookOpen, MessageSquare, Activity as ActivityIcon, TrendingUp, UserCheck, FileText, Eye, EyeOff, Clock } from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardProps {
  initialStats?: any;
}

export default function AdminDashboard({ initialStats }: AdminDashboardProps) {
  const { data: session } = useSession();
  const [stats, setStats] = useState(initialStats || null);
  const [loading, setLoading] = useState(!initialStats);
  const [activities, setActivities] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!stats) {
      fetchStats();
    }
    fetchRecentActivities();
    fetchRecentUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const res = await fetch('/api/admin/activities?limit=10');
      const data = await res.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchRecentUsers = async () => {
    try {
      const res = await fetch('/api/admin/users?limit=5');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Unauthorized access</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/users',
    },
    {
      title: 'Total Posts',
      value: stats?.stats?.totalPosts || 0,
      icon: BookOpen,
      color: 'bg-green-500',
      link: '/admin/posts',
    },
    {
      title: 'Total Comments',
      value: stats?.stats?.totalComments || 0,
      icon: MessageSquare,
      color: 'bg-purple-500',
      link: '/admin/comments',
    },
    {
      title: 'Activities',
      value: stats?.stats?.totalActivities || 0,
      icon: ActivityIcon,
      color: 'bg-orange-500',
      link: '/admin/activities',
    },
    {
      title: 'Published Posts',
      value: stats?.stats?.publishedPosts || 0,
      icon: Eye,
      color: 'bg-teal-500',
    },
    {
      title: 'Draft Posts',
      value: stats?.stats?.draftPosts || 0,
      icon: EyeOff,
      color: 'bg-gray-500',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post_created':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'post_updated':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'post_deleted':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'comment_created':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      case 'user_registered':
        return <UserCheck className="h-5 w-5 text-teal-600" />;
      default:
        return <ActivityIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getActivityLabel = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage the TTribe community</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                href={stat.link || '#'}
                className={`${stat.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 ${
                  !stat.link ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
              <Link
                href="/admin/activities"
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity: any) => (
                  <div
                    key={activity._id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {activity.user?.name || 'Unknown User'}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{getActivityLabel(activity.type)}</span>
                      </div>
                      {activity.details && (
                        <p className="text-sm text-gray-600 mb-1">{activity.details}</p>
                      )}
                      {activity.post && (
                        <Link
                          href={`/posts/${activity.post.slug}`}
                          className="text-sm text-primary-600 hover:underline"
                        >
                          {activity.post.title}
                        </Link>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No recent activities</p>
              )}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Users</h2>
              <Link
                href="/admin/users"
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user: any) => (
                  <div
                    key={user._id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{user.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            user.role === 'admin'
                              ? 'bg-red-100 text-red-700'
                              : user.role === 'moderator'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">@{user.username}</p>
                      <p className="text-xs text-gray-500">
                        {user.email} • {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No recent users</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/users"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage all users</p>
            </Link>
            <Link
              href="/admin/activities"
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
            >
              <ActivityIcon className="h-6 w-6 text-orange-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">View Activities</h3>
              <p className="text-sm text-gray-600">Monitor all platform activities</p>
            </Link>
            <Link
              href="/posts"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
            >
              <BookOpen className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">View Posts</h3>
              <p className="text-sm text-gray-600">Browse all community posts</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

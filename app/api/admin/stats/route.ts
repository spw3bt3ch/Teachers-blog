import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import Activity from '@/models/Activity';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get counts
    const [
      totalUsers,
      totalPosts,
      totalComments,
      totalActivities,
      activeUsers,
      publishedPosts,
      draftPosts,
    ] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments(),
      Comment.countDocuments(),
      Activity.countDocuments(),
      User.countDocuments({ role: 'teacher' }),
      Post.countDocuments({ published: true }),
      Post.countDocuments({ published: false }),
    ]);

    // Get recent activities
    const recentActivities = await Activity.find()
      .populate('user', 'name username email')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Get users by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get activities by type
    const activitiesByType = await Activity.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get recent registrations
    const recentRegistrations = await User.find()
      .select('name email username role createdAt')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      stats: {
        totalUsers,
        totalPosts,
        totalComments,
        totalActivities,
        activeUsers,
        publishedPosts,
        draftPosts,
      },
      usersByRole,
      activitiesByType,
      recentActivities,
      recentRegistrations,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

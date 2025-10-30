import Activity from '@/models/Activity';
import connectDB from './mongodb';

export async function logActivity(
  type: 'post_created' | 'post_updated' | 'post_deleted' | 'comment_created' | 'user_registered' | 'user_login' | 'user_updated',
  userId: string,
  options?: {
    postId?: string;
    commentId?: string;
    details?: string;
    metadata?: Record<string, any>;
  }
) {
  try {
    await connectDB();
    await Activity.create({
      type,
      user: userId,
      post: options?.postId,
      comment: options?.commentId,
      details: options?.details,
      metadata: options?.metadata,
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error - activity logging shouldn't break the app
  }
}

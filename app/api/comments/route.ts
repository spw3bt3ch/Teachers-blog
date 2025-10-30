import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';
import Post from '@/models/Post';
import { authOptions } from '@/lib/auth';
import { logActivity } from '@/lib/activity';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }

    const comments = await Comment.find({ post: postId, parent: null })
      .populate('author', 'name username image')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'name username image' },
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ comments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { content, postId, parentId } = body;

    if (!content || !postId) {
      return NextResponse.json({ error: 'Content and postId are required' }, { status: 400 });
    }

    // Verify post exists
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const comment = await Comment.create({
      content,
      author: session.user.id,
      post: postId,
      parent: parentId || null,
    });

    // If it's a reply, add to parent's replies
    if (parentId) {
      await Comment.findByIdAndUpdate(parentId, {
        $push: { replies: comment._id },
      });
    }

    await comment.populate('author', 'name username image');
    if (comment.parent) {
      await comment.populate('parent', 'author');
    }

    // Log activity
    await logActivity('comment_created', session.user.id, {
      postId: postId,
      commentId: comment._id.toString(),
      details: `Commented on post`,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

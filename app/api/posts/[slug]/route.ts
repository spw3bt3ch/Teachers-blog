import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { authOptions } from '@/lib/auth';
import { logActivity } from '@/lib/activity';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const post = await Post.findOne({ slug: params.slug, published: true })
      .populate('author', 'name username image bio school subject experience')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .lean();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment view count
    await Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const post = await Post.findOne({ slug: params.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if user is the author or admin
    if (post.author.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const updates: any = {};

    if (body.title) updates.title = body.title;
    if (body.content) updates.content = body.content;
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt;
    if (body.category !== undefined) updates.category = body.category;
    if (body.tags !== undefined) updates.tags = body.tags;
    if (body.featured !== undefined) updates.featured = body.featured;
    if (body.published !== undefined) updates.published = body.published;

    Object.assign(post, updates);
    await post.save();

    await post.populate('author', 'name username image');
    await post.populate('category', 'name slug');
    await post.populate('tags', 'name slug');

    // Log activity
    await logActivity('post_updated', session.user.id, {
      postId: post._id.toString(),
      details: `Updated post: ${post.title}`,
    });

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const post = await Post.findOne({ slug: params.slug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if user is the author or admin
    if (post.author.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const postTitle = post.title;
    await Post.findByIdAndDelete(post._id);

    // Log activity
    await logActivity('post_deleted', session.user.id, {
      details: `Deleted post: ${postTitle}`,
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

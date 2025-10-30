import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { authOptions } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { logActivity } from '@/lib/activity';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    const query: any = { published: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const posts = await Post.find(query)
      .populate('author', 'name username image')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
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
    const { title, content, excerpt, category, tags, featured, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = slugify(title);
    const existingPost = await Post.findOne({ slug });

    if (existingPost) {
      return NextResponse.json({ error: 'Post with this title already exists' }, { status: 400 });
    }

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      category,
      tags: tags || [],
      featured: featured || false,
      published: published || false,
      author: session.user.id,
    });

    await post.populate('author', 'name username image');
    await post.populate('category', 'name slug');
    await post.populate('tags', 'name slug');

    // Log activity
    await logActivity('post_created', session.user.id, {
      postId: post._id.toString(),
      details: `Created post: ${title}`,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

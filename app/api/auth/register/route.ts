import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { slugify } from '@/lib/utils';
import { logActivity } from '@/lib/activity';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, name, username, school, subject, experience } = body;

    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { error: 'Email, password, name, and username are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      username: username.toLowerCase(),
      school,
      subject,
      experience,
    });

    // Log activity
    await logActivity('user_registered', user._id.toString(), {
      details: `User registered: ${user.name} (${user.email})`,
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          username: user.username,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

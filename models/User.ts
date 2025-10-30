import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  username: string;
  password?: string;
  role: 'teacher' | 'admin' | 'moderator';
  school?: string;
  subject?: string;
  experience?: number;
  bio?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ['teacher', 'admin', 'moderator'],
      default: 'teacher',
    },
    school: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      min: 0,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

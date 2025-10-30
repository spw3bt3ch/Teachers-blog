import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IActivity extends Document {
  type: 'post_created' | 'post_updated' | 'post_deleted' | 'comment_created' | 'user_registered' | 'user_login' | 'user_updated';
  user: mongoose.Types.ObjectId;
  post?: mongoose.Types.ObjectId;
  comment?: mongoose.Types.ObjectId;
  details?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    type: {
      type: String,
      enum: ['post_created', 'post_updated', 'post_deleted', 'comment_created', 'user_registered', 'user_login', 'user_updated'],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    details: {
      type: String,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

ActivitySchema.index({ createdAt: -1 });
ActivitySchema.index({ user: 1, createdAt: -1 });
ActivitySchema.index({ type: 1, createdAt: -1 });

const Activity: Model<IActivity> =
  mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);

export default Activity;

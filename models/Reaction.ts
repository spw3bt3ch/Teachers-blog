import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReaction extends Document {
  type: 'like' | 'helpful' | 'insightful';
  user: mongoose.Types.ObjectId;
  post?: mongoose.Types.ObjectId;
  comment?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>(
  {
    type: {
      type: String,
      enum: ['like', 'helpful', 'insightful'],
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
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Ensure user can only react once per post/comment
ReactionSchema.index({ user: 1, post: 1 }, { unique: true, sparse: true });
ReactionSchema.index({ user: 1, comment: 1 }, { unique: true, sparse: true });

const Reaction: Model<IReaction> =
  mongoose.models.Reaction || mongoose.model<IReaction>('Reaction', ReactionSchema);

export default Reaction;

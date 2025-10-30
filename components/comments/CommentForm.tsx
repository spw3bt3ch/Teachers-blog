'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCommentAdded: (comment: any) => void;
  onCancel?: () => void;
}

interface CommentFormData {
  content: string;
}

export default function CommentForm({
  postId,
  parentId,
  onCommentAdded,
  onCancel,
}: CommentFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>();

  const onSubmit = async (data: CommentFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: data.content,
          postId,
          parentId,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to post comment');
      }

      const comment = await res.json();
      onCommentAdded(comment);
      reset();
      toast.success('Comment posted successfully!');
      if (onCancel) onCancel();
    } catch (error: any) {
      toast.error(error.message || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div>
        <textarea
          {...register('content', { required: 'Comment content is required', minLength: 1 })}
          placeholder={parentId ? 'Write your reply...' : 'Write your comment...'}
          className="textarea min-h-[100px] mb-3"
          rows={4}
        />
        {errors.content && (
          <p className="text-red-600 text-sm mb-2">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
          <Send className="h-4 w-4" />
          <span>{loading ? 'Posting...' : 'Post Comment'}</span>
        </button>
      </div>
    </form>
  );
}

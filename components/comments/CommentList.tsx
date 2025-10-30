'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { formatRelativeTime } from '@/lib/utils';
import { User, Reply, Heart } from 'lucide-react';
import CommentForm from './CommentForm';

interface CommentListProps {
  comments: Array<{
    _id: string;
    content: string;
    author: {
      name: string;
      username?: string;
      image?: string;
    };
    post: string;
    parent?: string;
    replies?: Array<{
      _id: string;
      content: string;
      author: {
        name: string;
        username?: string;
        image?: string;
      };
      createdAt: string;
    }>;
    createdAt: string;
  }>;
  onCommentAdded: (comment: any) => void;
}

export default function CommentList({ comments, onCommentAdded }: CommentListProps) {
  const { data: session } = useSession();

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} onCommentAdded={onCommentAdded} />
      ))}
    </div>
  );
}

function CommentItem({
  comment,
  onCommentAdded,
}: {
  comment: {
    _id: string;
    content: string;
    author: {
      name: string;
      username?: string;
      image?: string;
    };
    post: string;
    parent?: string;
    replies?: Array<{
      _id: string;
      content: string;
      author: {
        name: string;
        username?: string;
        image?: string;
      };
      createdAt: string;
    }>;
    createdAt: string;
  };
  onCommentAdded: (comment: any) => void;
}) {
  const { data: session } = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);

  const handleReplyAdded = (reply: any) => {
    setReplies((prev: any[]) => [reply, ...prev]);
    setShowReplyForm(false);
  };

  return (
    <div className="border-l-2 border-gray-200 pl-4 py-2">
      <div className="flex items-start space-x-3">
        <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
          {comment.author?.image ? (
            <img
              src={comment.author.image}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-primary-600" />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-gray-900">{comment.author?.name || 'Anonymous'}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
          </div>
          <p className="text-gray-700 mb-3 whitespace-pre-wrap">{comment.content}</p>
          <div className="flex items-center space-x-4">
            {session && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            )}
          </div>
          {showReplyForm && session && (
            <div className="mt-4">
              <CommentForm
                postId={comment.post}
                parentId={comment._id}
                onCommentAdded={handleReplyAdded}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}
          {replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {replies.map((reply: any) => (
                <div key={reply._id} className="border-l-2 border-gray-200 pl-4 py-2">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {reply.author?.image ? (
                        <img
                          src={reply.author.image}
                          alt={reply.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {reply.author?.name || 'Anonymous'}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {formatRelativeTime(reply.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { MessageSquare } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();

    // Poll for new comments every 5 seconds
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, [postId]);

  const handleCommentAdded = (newComment: any) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold">Comments</h2>
        <span className="text-gray-500">({comments.length})</span>
      </div>

      {session && <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />}

      {!session && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600">
            Please{' '}
            <a href="/auth/login" className="text-primary-600 hover:underline font-semibold">
              sign in
            </a>{' '}
            to leave a comment.
          </p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading comments...</div>
      ) : (
        <CommentList comments={comments} onCommentAdded={handleCommentAdded} />
      )}
    </div>
  );
}

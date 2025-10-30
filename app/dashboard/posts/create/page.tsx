'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import toast from 'react-hot-toast';
import { Save, Eye } from 'lucide-react';

interface PostFormData {
  title: string;
  excerpt: string;
  category: string;
  featured: boolean;
  published: boolean;
}

export default function CreatePostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: '',
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm<PostFormData>();

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const onSubmit = async (data: PostFormData) => {
    if (!editor) return;

    const content = editor.getHTML();

    if (!content || content === '<p></p>') {
      toast.error('Please write some content');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content,
          excerpt: data.excerpt,
          category: data.category || null,
          featured: data.featured || false,
          published: data.published || false,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create post');
      }

      const post = await res.json();
      toast.success(data.published ? 'Post published successfully!' : 'Post saved as draft!');
      router.push(`/posts/${post.slug}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!editor) {
    return <div className="min-h-screen flex items-center justify-center">Loading editor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
          <p className="text-gray-600">Share your knowledge with the TTribe community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="card">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="input"
                  placeholder="Enter post title..."
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt (Optional)
                </label>
                <textarea
                  {...register('excerpt')}
                  className="textarea"
                  rows={3}
                  placeholder="A brief summary of your post..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[400px]">
                  <div className="border-b border-gray-200 mb-4 pb-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`px-2 py-1 rounded ${
                        editor.isActive('bold') ? 'bg-primary-100 text-primary-700' : ''
                      }`}
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`px-2 py-1 rounded ${
                        editor.isActive('italic') ? 'bg-primary-100 text-primary-700' : ''
                      }`}
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={`px-2 py-1 rounded ${
                        editor.isActive('bulletList') ? 'bg-primary-100 text-primary-700' : ''
                      }`}
                    >
                      •
                    </button>
                  </div>
                  <EditorContent editor={editor} className="prose max-w-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category (Optional)
                  </label>
                  <input
                    {...register('category')}
                    type="text"
                    className="input"
                    placeholder="e.g., Teaching Methods"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    )}
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Post</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Controller
                    name="published"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    )}
                  />
                  <span className="text-sm font-medium text-gray-700">Publish Now</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
              <Save className="h-5 w-5" />
              <span>{loading ? 'Saving...' : 'Save Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

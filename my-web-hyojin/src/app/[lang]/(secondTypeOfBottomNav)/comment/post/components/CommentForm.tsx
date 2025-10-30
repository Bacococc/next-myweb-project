'use client';

import { useState, FormEvent } from 'react';
import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface CommentFormProps {
  onSubmit?: (data: { author: string; password: string; comment: string }) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!author || !password || !comment) return;

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'comments'), {
        author,
        password,
        content: comment,
        date: Timestamp.now(),
      });

      setAuthor('');
      setPassword('');
      setComment('');
      router.back();

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full flex justify-center mt-8 p-2">
      <p className="text-white text-9xl font-extrabold z-1 fixed mt-4">Comment!</p>
      <form onSubmit={handleSubmit} className="rounded-lg border border-gray-50/5 p-8 backdrop-blur z-50 mt-24 w-3/7">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="text-sm w-full bg-transparent border-b border-gray-100/30 text-white/90 placeholder-gray-100 focus:outline-none focus:border-white transition-colors px-2 py-2"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm w-full bg-transparent border-b border-gray-100/30 text-white/90 placeholder-gray-100 focus:outline-none focus:border-white transition-colors px-2 py-2"
              required
            />
          </div>
        </div>

        <label className="block text-white text-md mb-3"> Comment</label>

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-transparent border border-gray-100/30 text-white/90 placeholder-gray-200 focus:outline-none focus:border-white/80 transition-colors rounded-md p-4 mb-6 resize-none h-50 overflow-scroll"
          required
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="text-md text-white px-12 py-2 bg-white/20 border border-gray-100/30 rounded-full hover:bg-white/40 disabled:opacity-50 transition-colors"
            onSubmit={(() => onSubmit)}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

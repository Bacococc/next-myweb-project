'use client';

import { useState } from 'react';
import { useDict } from '@/i18n/langContext';
import Link from 'next/link';

export default function Timeline() {
  const dic = useDict();
  const [showAll, setShowAll] = useState(false);
  const timelineItems = dic.timelineItems;
  const limited = showAll ? timelineItems : timelineItems.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      <p className='text-5xl font-extrabold'>Commits Beyond Code</p>
      <p className="text-gray-300 mb-10 mt-2 text-md">
        {dic.timelineTitle} Click the title to see more.
      </p>
      <ul>
        {limited.map((item, idx: number) => (
          <li key={idx} className="mb-8">
            <div className="text-gray-500">{item.date}</div>
            {item.more === "y" ? (
              <Link href={`/journey/${idx}`} className="text-xl font-semibold underline hover:bg-white/30 hover:backdrop-blur-2xl rounded-full">
                {item.title}
              </Link>
            ) : (
              <div className="text-xl font-semibold">{item.title}</div>
            )}
            <div className="text-gray-400">{item.description}</div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowAll(!showAll)}
        className="bg-gray-800 rounded px-4 py-2 mt-3 text-gray-300 hover:bg-gray-700"
      >
        show more
      </button>
    </div>
  );
}

// app/_components/FiltersBar.tsx
'use client';

import Link from 'next/link';

interface FiltersBarProps {
  tags: string[];
}

export default function FiltersBar({ tags }: FiltersBarProps) {
  return (
    <div className="flex items-center space-x-4 px-6 py-4 bg-gray-100 dark:bg-gray-800">
      <Link href="/" className="text-sm font-medium text-blue-500 hover:underline">
        Show All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${tag}`}
          className="text-sm font-medium text-gray-500 hover:underline"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

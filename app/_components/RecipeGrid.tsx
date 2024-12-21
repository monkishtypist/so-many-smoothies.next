'use client';

import Card from '@components/Card';

interface Smoothie {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  tags?: string[];
  date: string;
  type?: 'smoothie';
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image?: {
    url: string;
    alt: string;
  };
  body?: Array<{ _type: string; children?: Array<{ text: string }> }>;
  date: string;
  type: 'post';
}

type RecipeGridProps = {
  smoothies: Smoothie[];
  posts: Post[];
};

export default function RecipeGrid({ smoothies, posts }: RecipeGridProps) {
  const sortedItems = [...smoothies, ...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white dark:bg-gray-900">
      {sortedItems.map((item, index) => {
        const isPost = item.type === 'post';
        const gridColumnSpan = isPost
          ? index === 0
            ? 'md:col-span-4'
            : 'md:col-span-2'
          : 'md:col-span-1';

        const href = isPost
          ? `/post/${item.slug.current}`
          : `/smoothie/${item.slug.current}`;

        const description = isPost
          ? item.body?.[0]?.children?.map((child) => child.text).join(' ') ||
            'Read more...'
          : item.description;

        return (
          <Card
            key={item._id}
            title={item.title}
            image={item.image}
            description={description}
            href={href}
            className={gridColumnSpan}
          />
        );
      })}
    </div>
  );
}

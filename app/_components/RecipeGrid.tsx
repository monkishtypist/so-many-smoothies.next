// app/components/RecipeGrid.tsx
import Card from '@components/Card';

interface Smoothie {
  _id: string;
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
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
  // Combine smoothies and posts, sorting by date (newest first)
  const gridItems = [...smoothies, ...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white dark:bg-gray-900">
      {gridItems.map((item, index) => {
        // Determine if the item is a blog post
        const isPost = item.type === 'post';

        // Adjust grid column spans for different item types
        const gridColumnSpan = isPost
          ? index === 0
            ? 'md:col-span-4'
            : 'md:col-span-2'
          : 'md:col-span-1';

        // Set href based on item type
        const href = isPost
          ? `/post/${item.slug.current}` // Use slug for posts
          : `/smoothie/${item.title.replace(/\s+/g, '-').toLowerCase()}`; // Slugify smoothie titles

        // Generate description dynamically
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
    </section>
  );
}

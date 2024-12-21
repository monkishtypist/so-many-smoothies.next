// app/tag/[tag]/page.tsx
import FiltersBar from '@components/FiltersBar';
import RecipeGrid from '@components/RecipeGrid';
import { getSmoothies, getPosts } from '@services/sanity';

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

// interface Post {
//   _id: string;
//   title: string;
//   slug: {
//     current: string;
//   };
//   image?: {
//     url: string;
//     alt: string;
//   };
//   body?: Array<{ _type: string; children?: Array<{ text: string }> }>;
//   date: string;
//   type: 'post';
// }

export async function generateStaticParams() {
  const smoothies = await getSmoothies();

  // Extract and encode unique tags
  const tags = Array.from(
    new Set(smoothies.flatMap((smoothie) => smoothie.tags || []))
  ).map((tag) => encodeURIComponent(tag));

  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  // Resolve params asynchronously to avoid sync access error
  const { tag } = await Promise.resolve(params);
  const decodedTag = decodeURIComponent(tag);

  const smoothies = await getSmoothies();
  const posts = await getPosts();

  const filteredSmoothies = smoothies.filter((smoothie: Smoothie) =>
    smoothie.tags?.includes(decodedTag)
  );

  const tags = Array.from(
    new Set(smoothies.flatMap((smoothie: Smoothie) => smoothie.tags || []))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <header className="py-6">
          <h1 className="text-2xl font-bold">Recipes with {decodedTag}</h1>
        </header>
        <main className="flex-grow">
          <FiltersBar tags={tags} />
          <RecipeGrid smoothies={filteredSmoothies} posts={[]} />
        </main>
        <footer className="py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 My Smoothie Recipes
          </p>
        </footer>
      </div>
    </div>
  );
}

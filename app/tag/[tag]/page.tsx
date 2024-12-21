// app/tag/[tag]/page.tsx
import FiltersBar from '@components/FiltersBar';
import RecipeGrid from '@components/RecipeGrid';
import { getSmoothies } from '@services/sanity';

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

export async function generateStaticParams() {
  const smoothies = await getSmoothies();

  // Extract and encode unique tags
  const tags = Array.from(
    new Set(smoothies.flatMap((smoothie) => smoothie.tags || []))
  ).map((tag) => encodeURIComponent(tag));

  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  // Decode tag to handle encoded characters
  const decodedTag = decodeURIComponent(params.tag);

  const smoothies = await getSmoothies();

  // Filter smoothies by tag
  const filteredSmoothies = smoothies.filter((smoothie: Smoothie) =>
    smoothie.tags?.includes(decodedTag)
  );

  // Extract all tags for FiltersBar
  const tags = Array.from(
    new Set(smoothies.flatMap((smoothie: Smoothie) => smoothie.tags || []))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <header className="py-6">
          <h1 className="text-2xl font-bold">
            Recipes with &ldquo;{decodedTag}&ldquo;
          </h1>
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

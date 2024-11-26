// app/page.tsx

import { getPosts, getSmoothies } from '@services/sanity';

import Header from '@components/Header';
import Intro from '@components/Intro';
import FiltersBar from '@components/FiltersBar';
import RecipeGrid from '@components/RecipeGrid';
import Footer from '@components/Footer';

export default async function HomePage() {
  const smoothies = await getSmoothies();
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Max-width container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Intro />
          <FiltersBar />
          <RecipeGrid
            smoothies={smoothies.map((smoothie) => ({
              ...smoothie,
              url: `/smoothie/${smoothie.title.replace(/\s+/g, '-').toLowerCase()}`, // Add slugified URL
              date: smoothie.date, // Include the date property
            }))}
            posts={posts}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}

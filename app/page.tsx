// app/page.tsx

import { getSmoothies, getPosts } from '@services/sanity';
import Header from '@components/Header';
import RecipeGrid from '@components/RecipeGrid';

export default async function HomePage() {
  const smoothies = await getSmoothies();
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <Header />
        <main className="flex-grow">
          <section className="py-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Welcome to So Many Smoothies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Hi! These recipes are generated by AI, offering unique and fun
              ideas for your smoothie cravings. Dive in and explore!
            </p>
          </section>
          <RecipeGrid smoothies={smoothies} posts={posts} />
        </main>
        <footer className="py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 So Many Smoothies. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

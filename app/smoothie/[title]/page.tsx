// app/smoothie/[title]/page.tsx

import { getSmoothies } from '@services/sanity';
import Image from 'next/image';
import LatestRecipes from '@components/LatestRecipes';

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const smoothies = await getSmoothies();
  return smoothies.map((smoothie) => ({
    title: smoothie.title.replace(/\s+/g, '-').toLowerCase(), // Slugify title
  }));
}

// Correct the type for params
interface PageProps {
  params: Promise<{ title: string }>; // `params` is a promise, updated type
}

// SmoothiePage Component
export default async function SmoothiePage({ params }: PageProps) {
  const { title } = await params; // Await `params` before destructuring
  const smoothies = await getSmoothies();

  const smoothie = smoothies.find(
    (s) => s.title.replace(/\s+/g, '-').toLowerCase() === title
  );

  // Handle case where smoothie is not found
  if (!smoothie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <h1 className="text-2xl font-bold">Smoothie not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <article className="py-8">
          {smoothie.image?.url && (
            <div className="relative w-full h-80 mb-8">
              <Image
                src={smoothie.image.url}
                alt={smoothie.title}
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{smoothie.title}</h1>
          <p className="text-lg mb-6">{smoothie.description}</p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside">
              {smoothie.ingredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Preparation Steps</h2>
            <ol className="list-decimal list-inside">
              {smoothie.steps.map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </article>

        <LatestRecipes />
      </div>
    </div>
  );
}

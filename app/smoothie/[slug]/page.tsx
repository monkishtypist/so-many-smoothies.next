// app/smoothie/[slug]/page.tsx

import { getSmoothies } from '@services/sanity';
import Image from 'next/image';
import Link from 'next/link';
import LatestRecipes from '@components/LatestRecipes';
import BackButton from '@components/BackButton';
import WhatYouWillNeed from '@components/WhatYouWillNeed';

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const smoothies = await getSmoothies();
  return smoothies.map((smoothie) => ({
    slug: smoothie.slug.current, // Use slug for params
  }));
}

// Correct the type for params
interface PageProps {
  params: Promise<{ slug: string }>; // `params` is a Promise, updated type
}

// SmoothiePage Component
export default async function SmoothiePage({ params }: PageProps) {
  const { slug } = await params; // Await `params` before destructuring
  const smoothies = await getSmoothies();

  const smoothie = smoothies.find((s) => s.slug.current === slug);

  // Handle case where smoothie is not found
  if (!smoothie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <h1 className="text-2xl font-bold">Smoothie not found</h1>
      </div>
    );
  }

  // Find previous and next recipes based on date
  const sortedSmoothies = [...smoothies].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const currentIndex = sortedSmoothies.findIndex((s) => s._id === smoothie._id);

  const nextSmoothie =
    currentIndex > 0 ? sortedSmoothies[currentIndex - 1] : null;
  const previousSmoothie =
    currentIndex < sortedSmoothies.length - 1
      ? sortedSmoothies[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <BackButton />

        <article className="py-8">
          {smoothie.image?.url && (
            <div className="relative w-full h-96 mb-8">
              <Image
                src={smoothie.image.url}
                alt={smoothie.title}
                fill
                className="object-cover rounded-lg shadow-md object-near-top"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{smoothie.title}</h1>
          <p className="text-lg mb-6">{smoothie.description}</p>

          <WhatYouWillNeed products={smoothie.affiliateProducts || []} />

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

        {/* Previous and Next Smoothies */}
        <nav className="flex justify-between items-center py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="w-1/3">
            {previousSmoothie ? (
              <Link
                href={`/smoothie/${previousSmoothie.slug.current}`}
                className="block text-left"
              >
                <div className="flex items-center">
                  <Image
                    src={
                      previousSmoothie.image?.url || '/images/placeholder.webp'
                    }
                    alt={previousSmoothie.title}
                    width={80}
                    height={80}
                    className="rounded-md shadow-md"
                  />
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Previous
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {previousSmoothie.title}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="/" className="block text-left">
                <div className="flex items-center">
                  <Image
                    src="/images/placeholder.webp"
                    alt="Back to Home"
                    width={80}
                    height={80}
                    className="rounded-md shadow-md"
                  />
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Back
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Home
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="w-1/3 text-right">
            {nextSmoothie && (
              <Link
                href={`/smoothie/${nextSmoothie.slug.current}`}
                className="block text-right"
              >
                <div className="flex items-center justify-end">
                  <div className="mr-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Next
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {nextSmoothie.title}
                    </p>
                  </div>
                  <Image
                    src={nextSmoothie.image?.url || '/placeholder.jpg'}
                    alt={nextSmoothie.title}
                    width={80}
                    height={80}
                    className="rounded-md shadow-md"
                  />
                </div>
              </Link>
            )}
          </div>
        </nav>

        {/* Latest Recipes */}
        <LatestRecipes />
      </div>
    </div>
  );
}

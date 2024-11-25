// /app/smoothies/[id]/page.tsx

import { getSmoothies } from '@/app/_services/sanity';
import Image from 'next/image';

// Define the type for the props passed to the page
interface PageProps {
  params: Promise<{ id: string }>; // Mark params as a Promise
}

// Generate static params for the dynamic route
export async function generateStaticParams() {
  const smoothies = await getSmoothies();
  return smoothies.map((smoothie) => ({
    id: smoothie._id, // Ensure `_id` is present in the fetched data
  }));
}

// SmoothiePage Component
export default async function SmoothiePage({ params }: PageProps) {
  const { id } = await params; // Await params before destructuring
  const smoothies = await getSmoothies();

  // Find the smoothie that matches the `id` from the URL
  const smoothie = smoothies.find((s) => s._id === id);

  // Handle case where smoothie is not found
  if (!smoothie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Smoothie not found</h1>
      </div>
    );
  }

  // Render the smoothie details
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{smoothie.title}</h1>
      <p className="text-lg mb-6">{smoothie.description}</p>
      {smoothie.image?.url && (
        <Image
          src={smoothie.image.url}
          alt={smoothie.title}
          fill
          className="w-full max-w-md mx-auto rounded-lg shadow-md"
        />
      )}

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
    </div>
  );
}

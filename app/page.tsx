import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import { getSmoothies } from '@/app/_services/sanity';

// Fetch data directly in the Server Component
export default async function HomePage() {
  const smoothies = await getSmoothies();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">So Many Smoothies</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {smoothies.map((smoothie: { _id: string; image?: { url: string; alt: string }; title: string; description: string }) => (
          <li key={smoothie._id} className="smoothie-card border rounded-lg overflow-hidden shadow-md">
            <Link href={`/smoothies/${smoothie._id}`} className="block hover:shadow-lg transition-shadow duration-300">
              {smoothie.image ? (
                <Image
                  src={smoothie.image.url}
                  alt={smoothie.image.alt || smoothie.title}
                  className="w-full h-40 object-cover"
                  width={300}
                  height={160} // Required for next/image
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{smoothie.title}</h2>
                <p className="text-gray-700 text-sm line-clamp-2">{smoothie.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

// app/services/sanity.ts

import { createClient } from '@sanity/client';
import { Smoothie } from '@/app/_types/smoothie';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01',
  useCdn: false, // Use CDN for better performance
});

export async function getSmoothies(): Promise<Smoothie[]> {
  const query = `*[_type == "smoothie"] {
    _id,
    title,
    description,
    "image": {
      "url": image.asset->url,
      "alt": coalesce(image.alt, title)
    },
    ingredients,
    steps,
    tags[]->{
      title
    },
    date
  }`;
  return await sanityClient.fetch(query);
}

// app/services/sanity.ts

import { createClient } from '@sanity/client';
import { Post } from '../_types/post';
import { Smoothie } from '../_types/smoothie';
import { BlockContent } from '../_types/blockContent';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01',
  useCdn: false, // Set to true for production if you want faster responses
});

export async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    author,
    "image": {
      "url": image.asset->url,
      "alt": coalesce(image.alt, title)
    },
    body,
    date
  }`;
  return await sanityClient.fetch(query);
}

export async function getSmoothies(): Promise<Smoothie[]> {
  const query = `*[_type == "smoothie"] {
    _id,
    title,
    slug,
    description,
    "image": {
      "url": image.asset->url,
      "alt": coalesce(image.alt, title)
    },
    "affiliateProducts": affiliateProducts[]->{
      _id,
      name,
      "image": image.asset->url,
      link,
      category
    },
    ingredients,
    steps,
    tags,
    date
  }`;
  return await sanityClient.fetch(query);
}

export async function getAboutPage(): Promise<{ content: BlockContent }> {
  const query = `*[_type == "about"][0] { 
    content 
  }`;
  return await sanityClient.fetch<{ content: BlockContent }>(query);
}

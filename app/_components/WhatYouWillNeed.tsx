import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AffiliateProduct } from '../_types/smoothie';

interface WhatYouWillNeedProps {
  products: AffiliateProduct[]; // Expecting a non-optional array
}

export default function WhatYouWillNeed({ products }: WhatYouWillNeedProps) {
  // Ensure products is always an array
  const safeProducts = products || []; // Default to an empty array if undefined

  if (safeProducts.length === 0) {
    return null; // Return nothing if there are no products
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">What You Will Need</h2>
      <div className="flex overflow-x-scroll space-x-4">
        {safeProducts.map((product) => (
          <div
            key={product._id}
            className="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <Link
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

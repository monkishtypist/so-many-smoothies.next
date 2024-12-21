// app/_components/PortableTextRenderer.tsx

import React from 'react';
import Image from 'next/image';

interface Block {
  _key: string;
  _type: string;
  style?: string;
  children?: Array<{ text: string }>;
  asset?: { _ref: string };
}

export default function PortableTextRenderer({
  content,
}: {
  content: Block[];
}) {
  return (
    <div>
      {content.map((block) => {
        switch (block._type) {
          case 'block': // Text or heading block
            if (block.style) {
              const HeadingTag = block.style as keyof JSX.IntrinsicElements; // Dynamically map to HTML tag
              if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style)) {
                return (
                  <HeadingTag
                    key={block._key}
                    className={`${block.style}`}
                  >
                    {block.children?.map((child, index) => (
                      <span key={index}>{child.text}</span>
                    ))}
                  </HeadingTag>
                );
              }
            }
            // Default paragraph styling
            return (
              <p key={block._key} className="mb-4 text-lg leading-relaxed">
                {block.children?.map((child, index) => (
                  <span key={index}>{child.text}</span>
                ))}
              </p>
            );

          case 'image': // Image block
            if (block.asset?._ref) {
              const imageUrl = block.asset._ref
                .replace('image-', 'https://cdn.sanity.io/images/YOUR_PROJECT_ID/YOUR_DATASET/')
                .replace('-jpg', '.jpg'); // Replace with actual transformation logic
              return (
                <div key={block._key} className="mb-6">
                  <Image
                    src={imageUrl}
                    alt="Dynamic Image"
                    width={600}
                    height={400}
                    className="rounded-md shadow"
                  />
                </div>
              );
            }
            return null;

          default: // Unknown block type
            console.warn(`Unsupported block type: ${block._type}`);
            return null;
        }
      })}
    </div>
  );
}

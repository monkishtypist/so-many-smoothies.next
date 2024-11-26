// app/_components/PortableTextRenderer.tsx

import React from 'react';
import Image from 'next/image';
import { BlockContent } from '../_types/blockContent';

export default function PortableTextRenderer({
  content,
}: {
  content: BlockContent;
}) {
  return (
    <div>
      {content.map((block) => {
        if (block._type === 'block') {
          return (
            <p key={block._key}>
              {block.children.map((child) => child.text).join(' ')}
            </p>
          );
        }
        if (block._type === 'image') {
          return (
            <Image
              key={block._key}
              src={block.asset._ref}
              alt="Dynamic Image"
              width={600}
              height={400}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

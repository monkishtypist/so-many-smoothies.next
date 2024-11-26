// app/components/Card.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Card({
  title,
  image,
  description,
  href,
  className,
}: {
  title: string;
  image?: { url: string; alt: string };
  description: string;
  href: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-lg overflow-hidden shadow-md ${className}`}
    >
      <Image
        src={image?.url || '/placeholder.jpg'} // Fallback to placeholder if no image is available
        alt={image?.alt || title} // Fallback alt text
        width={300}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}

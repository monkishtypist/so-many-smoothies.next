// app/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 shadow">
      <Link href="/">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          So Many Smoothies
        </p>
      </Link>
      <nav>
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-300 hover:underline mx-4"
        >
          Recipes
        </Link>
        {/* <Link
          href="/blog"
          className="text-gray-600 dark:text-gray-300 hover:underline mx-4"
        >
          Blog
        </Link> */}
        <Link
          href="/about"
          className="text-gray-600 dark:text-gray-300 hover:underline mx-4"
        >
          About
        </Link>
      </nav>
    </header>
  );
}

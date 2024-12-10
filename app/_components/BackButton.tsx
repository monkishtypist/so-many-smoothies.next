// app/_components/BackButton.tsx

import Link from 'next/link';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a1 1 0 01-.707-.293l-8-8a1 1 0 010-1.414l8-8a1 1 0 011.414 1.414L3.414 9H18a1 1 0 110 2H3.414l7.293 7.293A1 1 0 0110 18z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm font-medium">Back to Home</span>
    </Link>
  );
}

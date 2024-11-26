// app/components/FiltersBar.tsx
export default function FiltersBar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800">
      <div>
        <button className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
          All
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 ml-2">
          Detox
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 ml-2">
          Berry
        </button>
        {/* Add more filters */}
      </div>
      <div>
        <button className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
          Blog
        </button>
      </div>
    </div>
  );
}

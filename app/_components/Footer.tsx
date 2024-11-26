// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="py-4 bg-gray-800 text-gray-200 text-center">
      <p>
        &copy; {new Date().getFullYear()} So Many Smoothies. All Rights
        Reserved.
      </p>
    </footer>
  );
}

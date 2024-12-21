// app/about/page.tsx
import Header from '@components/Header';
import { getAboutPage } from '@services/sanity';
import { PortableText } from '@portabletext/react';

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <Header />
        <main className="flex-grow py-12">
          <section className="max-w-3xl mx-auto">
            {aboutData?.content ? (
              <PortableText value={aboutData.content} />
            ) : (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Welcome to So Many Smoothies! Stay tuned for more updates.
              </p>
            )}
          </section>
        </main>
        <footer className="py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 So Many Smoothies. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

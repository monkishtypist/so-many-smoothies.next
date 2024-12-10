// app/_components/LatestRecipes.tsx
import { getSmoothies } from '@services/sanity';
import Card from '@components/Card';

export default async function LatestRecipes() {
  // Fetch the latest smoothies independently
  const smoothies = await getSmoothies();

  // Sort and limit to the most recent 4 smoothies
  const latestSmoothies = smoothies
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Latest Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {latestSmoothies.map((smoothie) => (
          <Card
            key={smoothie._id}
            title={smoothie.title}
            image={smoothie.image}
            description={smoothie.description}
            href={`/smoothie/${smoothie.slug.current}`}
            className=""
          />
        ))}
      </div>
    </section>
  );
}

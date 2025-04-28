import type { Route } from '../../../../+types/features/products/pages/categories-page';
import type { MetaFunction } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Categories | ProductHunt Clone' },
    { name: 'description', content: 'Browse products by category' },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [], // Add categories fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Categories grid will go here */}
      </div>
    </div>
  );
}

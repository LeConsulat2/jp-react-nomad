import type { Route } from '../../../../+types/features/products/pages/category-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Category | ProductHunt Clone' },
    { name: 'description', content: 'Browse products in this category' },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { category } = params;

  return {
    category,
    products: [], // Add category products fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, products } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Category: {category}</h1>

      <div className="mb-6">
        <Link
          to="/products/categories"
          className="text-blue-600 hover:underline"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products grid will go here */}
      </div>
    </div>
  );
}

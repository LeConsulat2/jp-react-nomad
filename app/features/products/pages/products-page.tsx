import type { Route } from '../../../../+types/features/products/pages/products-page';
import type { MetaFunction } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Products | ProductHunt Clone' },
    { name: 'description', content: 'Browse all products' },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    products: [], // Add products fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products grid will go here */}
      </div>
    </div>
  );
}

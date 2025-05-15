import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/products-page';

import type { MetaFunction } from '@react-router/types';

export function meta(): MetaFunction {
  return [
    { title: 'Products | ProductHunt Clone' },
    { name: 'description', content: 'Browse all products' },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const products = await getProducts(client);
  return {
    products,
  };
};

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {/* Add products grid */}
    </div>
  );
}

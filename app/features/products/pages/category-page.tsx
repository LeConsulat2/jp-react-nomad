import { Link } from 'react-router';
import { z } from 'zod';
import {
  getCategory,
  getProductsByCategory,
  getProductsByDateRange,
} from '../queries';
import type { Route } from './+types/category-page';
import { Hero } from '~/common/components/Hero';
import { ProductCard } from '../components/product-card';
import ProductPagination from '~/common/components/product-pagination';

export function meta(): Route.MetaFunction {
  return [
    { title: 'Category | We-Create' },
    { name: 'description', content: 'Browse products in this category' },
  ];
}

const paramSchema = z.object({
  category: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;
  const { data, success } = paramSchema.safeParse(params);
  if (!success) {
    throw new Response('Invalid category', { status: 400 });
  }
  const category = await getCategory(data.category);
  const { products, totalPages } = await getProductsByCategory({
    categoryId: data.category,
    page: Number(page),
  });

  return { category, products, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero
        title={loaderData.category.name}
        subtitle={loaderData.category.description}
      />

      <div className="text-3xl font-bold mb-6">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>

      <div className="mb-6">
        <Link
          to="/products/categories"
          className="text-blue-600 hover:underline"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductPagination totalPages={loaderData.totalPages} />
      </div>
    </div>
  );
}

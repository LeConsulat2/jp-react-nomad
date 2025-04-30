import type { Route } from '../../../../+types/features/products/pages/product-overview-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Product Overview | ProductHunt Clone' },
    { name: 'description', content: 'View detailed product information' },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;

  // In a real app, fetch the product from an API or database
  return {
    product: {
      id: productId,
      name: 'Sample Product',
      description:
        'This is a detailed description of the product with features and benefits.',
      thumbnail: 'https://placehold.co/400',
      tagline: 'A revolutionary product that solves your problems',
      website: 'https://example.com',
      upvotes: 120,
      launchDate: new Date().toISOString(),
      category: {
        id: 'productivity',
        name: 'Productivity',
      },
    },
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function ProductOverviewPage({
  loaderData,
}: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />

          <div className="mt-6 flex flex-col gap-4">
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Visit Website
            </a>

            <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition flex items-center justify-center gap-2">
              <span>Upvote</span>
              <span className="font-bold">{product.upvotes}</span>
            </button>
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.tagline}</p>

          <div className="mb-6 flex items-center">
            <Link
              to={`/products/categories/${product.category.id}`}
              className="text-sm bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition"
            >
              {product.category.name}
            </Link>
            <span className="mx-3 text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              Launched on {new Date(product.launchDate).toLocaleDateString()}
            </span>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-3">About this product</h2>
            <p>{product.description}</p>
          </div>

          <div className="mt-8 border-t pt-6">
            <Link
              to={`/products/${product.id}/reviews`}
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <span>See all reviews</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

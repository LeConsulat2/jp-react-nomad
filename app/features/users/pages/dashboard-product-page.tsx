import type { MetaFunction } from 'react-router';

export interface Route {
  LoaderArgs: {
    params: {
      productId: string;
    };
    request: Request;
  };
  ActionArgs: {
    params: {
      productId: string;
    };
    request: Request;
  };
  ComponentProps: {
    loaderData: {
      product: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
        stats: {
          views: number;
          upvotes: number;
          reviews: number;
        };
      };
    };
    actionData?: unknown;
  };
}

export function meta({
  loaderData,
}: {
  loaderData: Route['ComponentProps']['loaderData'];
}): ReturnType<MetaFunction> {
  return [
    { title: `${loaderData?.product?.name || 'Product'} Dashboard` },
    { name: 'description', content: 'Manage your product' },
  ];
}

export function loader({ params }: Route['LoaderArgs']) {
  return {
    product: {
      id: params.productId,
      name: 'Product Name',
      description: 'Product description would go here.',
      createdAt: new Date().toISOString(),
      stats: {
        views: 0,
        upvotes: 0,
        reviews: 0,
      },
    },
  };
}

export default function DashboardProductPage({
  loaderData,
}: Route['ComponentProps']) {
  const { product } = loaderData;

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Product
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            View Public Page
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Views
          </h2>
          <p className="text-3xl font-bold">{product.stats.views}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Upvotes
          </h2>
          <p className="text-3xl font-bold">{product.stats.upvotes}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Reviews
          </h2>
          <p className="text-3xl font-bold">{product.stats.reviews}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p>{product.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p>{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      </div>
    </div>
  );
}

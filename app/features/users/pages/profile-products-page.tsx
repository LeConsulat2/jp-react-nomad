import type { MetaFunction } from 'react-router';

interface Route {
  params: {
    username: string;
  };
  loaderData: {
    products: Array<{
      id: string;
      name: string;
      description: string;
      imageUrl: string;
    }>;
  };
  actionData: unknown;
}

export function loader() {
  return {};
}

export function action() {
  return {};
}

export const meta: MetaFunction = () => {
  return [
    { title: 'User Products' },
    { name: 'description', content: "View user's products" },
  ];
};

export default function ProfileProductsPage({
  params,
  loaderData,
}: {
  params: Route['params'];
  loaderData: Route['loaderData'];
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {params.username}'s Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="h-40 bg-gray-200 rounded-md mb-3"></div>
            <h3 className="font-medium">Product Name</h3>
            <p className="text-sm text-gray-500">
              Product description goes here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Route } from '../../../../+types/features/products/pages/submit-page';
import type { MetaFunction } from 'react-router';
import { Form } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Submit Product | ProductHunt Clone' },
    { name: 'description', content: 'Submit your product' },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [], // Add categories fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  // Handle form submission
  return {
    success: false,
    errors: {
      // Add form validation logic
    },
  };
}

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { categories } = loaderData;
  const errors = actionData?.errors || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit Your Product</h1>

      <Form method="post" className="max-w-2xl space-y-6">
        <div>
          <label className="block mb-2 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border rounded-md h-32"
          />
          {errors.description && (
            <p className="text-red-600 mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select a category</option>
            {/* Add category options */}
          </select>
          {errors.category && (
            <p className="text-red-600 mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Product URL</label>
          <input
            type="url"
            name="url"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.url && <p className="text-red-600 mt-1">{errors.url}</p>}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Product
        </button>
      </Form>
    </div>
  );
}

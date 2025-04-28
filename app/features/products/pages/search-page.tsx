import type { Route } from '../../../../+types/features/products/pages/search-page';
import type { MetaFunction } from 'react-router';
import { Form } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Search Products | ProductHunt Clone' },
    { name: 'description', content: 'Search for products' },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  return {
    query,
    results: [], // Add search results fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { query, results } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>

      <Form method="get" className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            className="flex-1 px-4 py-2 border rounded-md"
            placeholder="Search for products..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </Form>

      {query && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Results for "{query}"</h2>
          <div className="space-y-4">
            {/* Search results will go here */}
            {results.length === 0 && (
              <p>No products found matching your search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

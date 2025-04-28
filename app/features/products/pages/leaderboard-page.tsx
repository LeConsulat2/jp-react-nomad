import type { Route } from '../../../../+types/features/products/pages/leaderboard-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Leaderboards | ProductHunt Clone' },
    { name: 'description', content: 'Product leaderboards' },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    topProducts: [], // Add top products fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { topProducts } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link
          to="/products/leaderboards/yearly/2023"
          className="p-4 border rounded-md hover:bg-gray-50"
        >
          Yearly
        </Link>
        <Link
          to="/products/leaderboards/monthly/2023/04"
          className="p-4 border rounded-md hover:bg-gray-50"
        >
          Monthly
        </Link>
        <Link
          to="/products/leaderboards/weekly/2023/16"
          className="p-4 border rounded-md hover:bg-gray-50"
        >
          Weekly
        </Link>
        <Link
          to="/products/leaderboards/daily/2023/04/28"
          className="p-4 border rounded-md hover:bg-gray-50"
        >
          Daily
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Top Products</h2>
      <div className="space-y-4">{/* Top products will go here */}</div>
    </div>
  );
}

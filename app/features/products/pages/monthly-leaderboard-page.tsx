import type { Route } from '../../../../+types/features/products/pages/monthly-leaderboard-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Monthly Leaderboard | ProductHunt Clone' },
    { name: 'description', content: 'Monthly product leaderboard' },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month } = params;

  return {
    year,
    month,
    products: [], // Add monthly products fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, month, products } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Monthly Leaderboard - {month}/{year}
      </h1>

      <div className="mb-6">
        <Link
          to="/products/leaderboards"
          className="text-blue-600 hover:underline"
        >
          ← Back to Leaderboards
        </Link>
      </div>

      <div className="space-y-4">{/* Products list will go here */}</div>
    </div>
  );
}

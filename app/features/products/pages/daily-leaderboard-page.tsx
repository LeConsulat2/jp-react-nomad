import type { Route } from '../../../../+types/features/products/pages/daily-leaderboard-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Daily Leaderboard | ProductHunt Clone' },
    { name: 'description', content: 'Daily product leaderboard' },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month, day } = params;

  return {
    year,
    month,
    day,
    products: [], // Add daily products fetch logic
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, month, day, products } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Daily Leaderboard - {month}/{day}/{year}
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

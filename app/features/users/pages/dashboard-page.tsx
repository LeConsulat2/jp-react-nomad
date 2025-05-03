import type { MetaFunction } from 'react-router';

export interface Route {
  LoaderArgs: {
    request: Request;
  };
  ActionArgs: {
    request: Request;
  };
  ComponentProps: {
    loaderData: {
      stats: {
        products: number;
        ideas: number;
        messages: number;
      };
    };
    actionData?: unknown;
  };
}

export function meta(): ReturnType<MetaFunction> {
  return [
    { title: 'Dashboard' },
    { name: 'description', content: 'User Dashboard' },
  ];
}

export function loader({ request }: Route['LoaderArgs']) {
  return {
    stats: {
      products: 0,
      ideas: 0,
      messages: 0,
    },
  };
}

export default function DashboardPage({ loaderData }: Route['ComponentProps']) {
  const { stats } = loaderData;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Products
          </h2>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Ideas
          </h2>
          <p className="text-3xl font-bold">{stats.ideas}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Messages
          </h2>
          <p className="text-3xl font-bold">{stats.messages}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
}

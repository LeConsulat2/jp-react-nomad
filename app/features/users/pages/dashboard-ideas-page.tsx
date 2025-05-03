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
      ideas: Array<{
        id: string;
        title: string;
        description: string;
        createdAt: string;
        votes: number;
      }>;
    };
    actionData?: unknown;
  };
}

export function meta(): ReturnType<MetaFunction> {
  return [
    { title: 'My Ideas' },
    { name: 'description', content: 'Manage your ideas' },
  ];
}

export function loader({ request }: Route['LoaderArgs']) {
  return {
    ideas: [],
  };
}

export default function DashboardIdeasPage({
  loaderData,
}: Route['ComponentProps']) {
  const { ideas } = loaderData;

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Ideas</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          New Idea
        </button>
      </div>

      {ideas.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">
            You haven't created any ideas yet.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create Your First Idea
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-start justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {idea.description}
                </p>
                <div className="text-sm text-gray-500">
                  Created on {new Date(idea.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-center mr-6">
                  <div className="text-2xl font-bold">{idea.votes}</div>
                  <div className="text-sm text-gray-500">votes</div>
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Edit</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

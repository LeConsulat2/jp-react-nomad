import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export interface Route {
  LoaderArgs: {
    request: Request;
  };
  ActionArgs: {
    request: Request;
  };
  ComponentProps: {
    loaderData: {
      messages: Array<{
        id: string;
        subject: string;
        sender: {
          id: string;
          name: string;
          avatar?: string;
        };
        excerpt: string;
        createdAt: string;
        isRead: boolean;
      }>;
    };
    actionData?: unknown;
  };
}

export function meta(): ReturnType<MetaFunction> {
  return [
    { title: 'Messages' },
    { name: 'description', content: 'Your messages' },
  ];
}

export function loader({ request }: Route['LoaderArgs']) {
  return {
    messages: [],
  };
}

export default function MessagesPage({ loaderData }: Route['ComponentProps']) {
  const { messages } = loaderData;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">You don't have any messages yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((message) => (
              <li key={message.id}>
                <Link
                  to={`/my/messages/${message.id}`}
                  className={`block p-6 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    !message.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {message.sender.avatar ? (
                          <img
                            src={message.sender.avatar}
                            alt={message.sender.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-lg font-medium">
                              {message.sender.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p
                            className={`text-sm font-medium ${
                              !message.isRead
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {message.sender.name}
                          </p>
                          {!message.isRead && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                          )}
                        </div>
                        <p className="text-base font-semibold mt-1">
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {message.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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
      notifications: Array<{
        id: string;
        type: 'comment' | 'mention' | 'follow' | 'like' | 'product_update';
        message: string;
        createdAt: string;
        isRead: boolean;
        link: string;
        user?: {
          id: string;
          name: string;
          avatar?: string;
        };
      }>;
    };
    actionData?: unknown;
  };
}

export function meta(): ReturnType<MetaFunction> {
  return [
    { title: 'Notifications' },
    { name: 'description', content: 'Your notifications' },
  ];
}

export function loader({ request }: Route['LoaderArgs']) {
  // In a real app, we would fetch notifications from an API
  return {
    notifications: [],
  };
}

export function action({ request }: Route['ActionArgs']) {
  // In a real app, this would handle marking notifications as read
  return {};
}

export default function NotificationsPage({
  loaderData,
}: Route['ComponentProps']) {
  const { notifications } = loaderData;

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>

        {notifications.length > 0 && (
          <form method="post">
            <input type="hidden" name="action" value="markAllAsRead" />
            <button
              type="submit"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Mark all as read
            </button>
          </form>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">You don't have any notifications yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={
                  !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }
              >
                <a
                  href={notification.link}
                  className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-start space-x-3">
                    {notification.user && (
                      <div className="flex-shrink-0">
                        {notification.user.avatar ? (
                          <img
                            src={notification.user.avatar}
                            alt={notification.user.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {notification.user.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="flex-shrink-0">
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                      </div>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

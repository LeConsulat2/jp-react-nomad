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
      settings: {
        email: string;
        emailNotifications: {
          marketing: boolean;
          security: boolean;
          productUpdates: boolean;
          comments: boolean;
          mentions: boolean;
        };
        theme: 'light' | 'dark' | 'system';
      };
    };
    actionData?: {
      success?: boolean;
      error?: string;
    };
  };
}

export function meta(): ReturnType<MetaFunction> {
  return [
    { title: 'Settings' },
    { name: 'description', content: 'User settings' },
  ];
}

export function loader({ request }: Route['LoaderArgs']) {
  return {
    settings: {
      email: 'user@example.com',
      emailNotifications: {
        marketing: true,
        security: true,
        productUpdates: true,
        comments: true,
        mentions: true,
      },
      theme: 'system' as const,
    },
  };
}

export function action({ request }: Route['ActionArgs']) {
  return {
    success: true,
  };
}

export default function SettingsPage({
  loaderData,
  actionData,
}: Route['ComponentProps']) {
  const { settings } = loaderData;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {actionData?.error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          {actionData.error}
        </div>
      )}

      {actionData?.success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
          Settings updated successfully!
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

        <form method="post">
          <input type="hidden" name="formType" value="account" />

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={settings.email}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Account
            </button>

            <button
              type="button"
              className="px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>

        <form method="post">
          <input type="hidden" name="formType" value="appearance" />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  defaultChecked={settings.theme === 'light'}
                  className="mr-2"
                />
                <span>Light</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  defaultChecked={settings.theme === 'dark'}
                  className="mr-2"
                />
                <span>Dark</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  defaultChecked={settings.theme === 'system'}
                  className="mr-2"
                />
                <span>System</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Appearance
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>

        <form method="post">
          <input type="hidden" name="formType" value="notifications" />

          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="marketing"
                  name="marketing"
                  type="checkbox"
                  defaultChecked={settings.emailNotifications.marketing}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="marketing"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Marketing emails
                </label>
                <p className="text-gray-500">
                  Receive emails about new features and promotions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="security"
                  name="security"
                  type="checkbox"
                  defaultChecked={settings.emailNotifications.security}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="security"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Security updates
                </label>
                <p className="text-gray-500">
                  Receive security and account alerts.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="productUpdates"
                  name="productUpdates"
                  type="checkbox"
                  defaultChecked={settings.emailNotifications.productUpdates}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="productUpdates"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Product updates
                </label>
                <p className="text-gray-500">
                  Receive updates about products you follow.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  defaultChecked={settings.emailNotifications.comments}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="comments"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Comments
                </label>
                <p className="text-gray-500">
                  Receive emails when someone comments on your posts.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="mentions"
                  name="mentions"
                  type="checkbox"
                  defaultChecked={settings.emailNotifications.mentions}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="mentions"
                  className="font-medium text-gray-700 dark:text-gray-300"
                >
                  Mentions
                </label>
                <p className="text-gray-500">
                  Receive emails when someone mentions you.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Notification Preferences
          </button>
        </form>
      </div>
    </div>
  );
}

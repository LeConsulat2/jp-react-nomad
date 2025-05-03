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
      user: {
        id: string;
        username: string;
        name: string;
        bio: string;
        email: string;
        avatar?: string;
        socialLinks: {
          twitter?: string;
          github?: string;
          linkedin?: string;
          website?: string;
        };
        joinedAt: string;
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
    { title: 'My Profile' },
    { name: 'description', content: 'Manage your profile' },
  ];
}

export function loader({ request }: Route['LoaderArgs']) {
  return {
    user: {
      id: 'user-1',
      username: 'johndoe',
      name: 'John Doe',
      bio: 'Full-stack developer and product enthusiast.',
      email: 'john@example.com',
      socialLinks: {},
      joinedAt: new Date().toISOString(),
    },
  };
}

export function action({ request }: Route['ActionArgs']) {
  return {
    success: true,
  };
}

export default function MyProfilePage({
  loaderData,
  actionData,
}: Route['ComponentProps']) {
  const { user } = loaderData;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <div className="flex items-start">
          <div className="mr-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-2xl font-medium">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Change avatar
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500 mb-2">@{user.username}</p>
            <p>{user.bio}</p>
            <p className="text-sm text-gray-500 mt-2">
              Joined {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {actionData?.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {actionData.error}
          </div>
        )}

        {actionData?.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Profile updated successfully!
          </div>
        )}

        <form method="post">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user.name}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={user.username}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user.email}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              defaultValue={user.bio}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
            ></textarea>
          </div>

          <h3 className="text-lg font-medium mb-3">Social Links</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                defaultValue={user.socialLinks.twitter}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                GitHub
              </label>
              <input
                type="url"
                id="github"
                name="github"
                defaultValue={user.socialLinks.github}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                defaultValue={user.socialLinks.linkedin}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                defaultValue={user.socialLinks.website}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

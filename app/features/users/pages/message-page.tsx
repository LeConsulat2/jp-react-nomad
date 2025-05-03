import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export interface Route {
  LoaderArgs: {
    params: {
      messageId: string;
    };
    request: Request;
  };
  ActionArgs: {
    params: {
      messageId: string;
    };
    request: Request;
  };
  ComponentProps: {
    loaderData: {
      message: {
        id: string;
        subject: string;
        body: string;
        sender: {
          id: string;
          name: string;
          avatar?: string;
        };
        createdAt: string;
      };
    };
    actionData?: unknown;
  };
}

export function meta({
  loaderData,
}: {
  loaderData: Route['ComponentProps']['loaderData'];
}): ReturnType<MetaFunction> {
  return [
    { title: loaderData?.message?.subject || 'Message' },
    { name: 'description', content: 'View message' },
  ];
}

export function loader({ params }: Route['LoaderArgs']) {
  return {
    message: {
      id: params.messageId,
      subject: 'Sample Message',
      body: 'This is a sample message body.',
      sender: {
        id: 'user-1',
        name: 'John Doe',
      },
      createdAt: new Date().toISOString(),
    },
  };
}

export default function MessagePage({ loaderData }: Route['ComponentProps']) {
  const { message } = loaderData;

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          to="/my/messages"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to messages
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <h1 className="text-2xl font-bold mb-4">{message.subject}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
              <div>
                <p className="font-medium">{message.sender.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>{message.body}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Reply</h2>
          <textarea
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={4}
            placeholder="Write your reply..."
          ></textarea>
          <div className="mt-4 text-right">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

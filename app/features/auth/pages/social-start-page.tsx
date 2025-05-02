import type { Route } from '../../../common/+types/route-types';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Social Login' },
    { name: 'description', content: 'Log in with your social account' },
  ];
};

export default function SocialStartPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Social Login</h1>
        <p className="text-sm text-gray-500">
          Redirecting to authentication provider...
        </p>
      </div>

      <div className="flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    </div>
  );
}

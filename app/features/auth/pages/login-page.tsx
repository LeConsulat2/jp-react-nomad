import type { Route } from '../../../common/+types/route-types';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Login | Product Hunt Clone' },
    { name: 'description', content: 'Log in to your account' },
  ];
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-gray-500">Welcome back!</p>
      </div>

      <div className="space-y-4">
        {/* Form would go here */}
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a
            href="/auth/join"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

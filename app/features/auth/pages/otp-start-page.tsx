import type { Route } from '../../../common/+types/route-types';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Enter Email | OTP Authentication' },
    { name: 'description', content: 'Start one-time password authentication' },
  ];
};

export default function OtpStartPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">One-Time Password Login</h1>
        <p className="text-sm text-gray-500">
          Enter your email to receive a login code
        </p>
      </div>

      <div className="space-y-4">
        {/* Form would go here */}
        <p className="text-center text-sm">
          <a
            href="/auth/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}

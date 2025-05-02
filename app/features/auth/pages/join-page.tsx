import type { Route } from '../../../common/+types/route-types';

export function meta(args: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'Join | Product Hunt Clone' },
    { name: 'description', content: 'Create a new account' },
  ];
}

export default function JoinPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full text-white px-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-rose-100">
          Join our community and start your journey today.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        {/* Form placeholder */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-sm font-semibold rounded-lg shadow-lg transition"
        >
          Sign up
        </button>

        <p className="text-center text-sm text-rose-100">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="font-medium underline hover:text-white"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

import { z } from 'zod';
import type { Route } from '../../../common/+types/route-types';
import { redirect, useParams } from 'react-router';
import { makeSSRClient } from '~/supa-client';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Social Login' },
    { name: 'description', content: 'Log in with your social account' },
  ];
};

const paramsSchema = z.object({
  provider: z.enum(['google', 'github']),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect('/auth/login');
  }
  const { provider } = data;
  const redirectTo = `http://localhost:5173/auth/social/${provider}/complete`;
  const { client, headers } = makeSSRClient(request);
  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
  if (url) {
    return redirect(url, { headers });
  }
  if (error) {
    throw error;
  }
};

export default function SocialStartPage() {
  const params = useParams();
  const { provider } = paramsSchema.parse(params);

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

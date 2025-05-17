import { z } from 'zod';
import type { Route } from '../../../common/+types/route-types';
import { makeSSRClient } from '~/supa-client';
import { redirect } from 'react-router';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Complete Social Login' },
    { name: 'description', content: 'Complete your social login' },
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
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return redirect('/auth/login');
  }
  const { client, headers } = makeSSRClient(request);
  const { error } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  return redirect('/', { headers });
};

export default function SocialCompletePage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Complete Social Login</h1>
        <p className="text-sm text-gray-500">
          Finalizing your authentication...
        </p>
      </div>

      <div className="flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    </div>
  );
}

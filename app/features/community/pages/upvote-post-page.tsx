import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/upvote-post-page';
import { getLoggedInUserId } from '~/features/users/queries';
import { toggleUpvote } from '../mutations';

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  await toggleUpvote(client as any, {
    postId: Number(params.postId),
    userId,
  });
  return {
    ok: true,
  };
};

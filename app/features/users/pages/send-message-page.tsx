import { z } from 'zod';
import type { Route } from './+types/send-message-page';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId, getUserProfile } from '../queries';
import { redirect } from 'react-router';
import { sendMessage } from '../mutations';

const formSchema = z.object({
  content: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
  const formData = await request.formData();
  const { client } = makeSSRClient(request);
  const fromUserId = await getLoggedInUserId(client as any);
  const { profile_id: toUserId } = await getUserProfile(
    client as any,
    params.username as string,
  );
  const messageRoomId = await sendMessage(client as any, {
    fromUserId,
    toUserId,
    content: formData.get('content') as string,
  });
  return redirect(`/my/messages/${messageRoomId}`);
};

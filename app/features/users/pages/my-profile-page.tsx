import { redirect } from 'react-router';
import type { Route } from './+types/my-profile-page';
import { makeSSRClient } from '~/supa-client';
import { getUserById } from '../queries';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'My Profile' }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client as any, { id: user.id });
    return redirect(`/users/${encodeURIComponent(profile.username)}`);
  }
  return redirect('/auth/login');
}

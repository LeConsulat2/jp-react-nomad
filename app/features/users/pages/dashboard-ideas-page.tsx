import { IdeaCard } from '~/features/ideas/components/idea-card';
import type { Route } from './+types/dashboard-ideas-page';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '../queries';
import { getClaimedIdeas } from '~/features/ideas/queries';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'My Ideas | We-Create' }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const ideas = await getClaimedIdeas(client as any, { userId });
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold mb-6">My Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}

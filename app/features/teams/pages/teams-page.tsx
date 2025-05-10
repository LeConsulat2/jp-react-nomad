import type { Route } from './+types/teams-page';
import { TeamCard } from '~/features/teams/components/team-card';
import { Hero } from '~/common/components/Hero';
import { getTeams } from '../queries';

export const meta: Route.MetaFunction = () => [{ title: 'Teams | We-Create' }];

export const loader = async () => {
  const teams = await getTeams({ limit: 8 });
  console.log('데이터 확인:', teams);
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Teams" subtitle="Find a team looking for a new member." />
      <div className="grid grid-cols-4 gap-4">
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.team_leader.username}
            leaderAvatarUrl={team.team_leader.avatar}
            positions={team.roles.split(',')}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}

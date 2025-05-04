import { IdeaCard } from '~/features/products/components/idea-card';
import type { Route } from './+types/dashboard-ideas-page';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'My Ideas | We-Create' }];
};

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold mb-6">My Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewsCount={123}
            postedAt="10 hours ago"
            likesCount={10}
          />
        ))}
      </div>
    </div>
  );
}

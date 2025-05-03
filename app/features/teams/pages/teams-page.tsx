import { Link } from 'react-router';
import { Hero } from '~/common/components/Hero';
import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/teams-page';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Teams | wemake' }];
};

export default function TeamsPage() {
  return (
    <div className="space-y-10">
      <Hero title="Teams" subtitle="Discover teams building amazing products" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Teams</h2>
        <Button asChild>
          <Link to="/teams/create">Create a Team</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Teams would be loaded here */}
        <div className="border rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
            <div>
              <h3 className="font-semibold">Team Alpha</h3>
              <p className="text-sm text-muted-foreground">5 members</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Building innovative tools for developers
          </p>
          <Button variant="outline" asChild className="w-full">
            <Link to="/teams/team-alpha">View Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

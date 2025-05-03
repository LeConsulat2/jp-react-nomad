import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Badge } from '~/common/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import type { Route } from './+types/team-page';

export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `${params.teamId} Team | wemake` }];
};

export default function TeamPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="h-32 w-32 rounded-lg bg-gray-200"></div>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Team Alpha</h1>
            <p className="text-muted-foreground">
              Building innovative tools for developers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">5 members</Badge>
            <Badge variant="outline">3 products</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button>Follow Team</Button>
            <Button variant="outline">Contact</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        <div className="md:col-span-4 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-muted-foreground">
              Team Alpha is a group of passionate developers focused on creating
              tools that make the development process easier and more efficient.
              We specialize in frontend frameworks and developer tooling.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">DevTools Pro</h3>
                <p className="text-sm text-muted-foreground">
                  A comprehensive suite of developer tools
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                  <AvatarImage src="" />
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Founder</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JS</AvatarFallback>
                  <AvatarImage src="" />
                </Avatar>
                <div>
                  <h3 className="font-medium">Jane Smith</h3>
                  <p className="text-sm text-muted-foreground">
                    Lead Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

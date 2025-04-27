import { Link } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import { Button } from '~/common/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';

interface TeamCardProps {
  id: string;
  leaderUsername: string;
  leaderAvatarUrl: string;
  positions: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  leaderUsername,
  leaderAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant={'secondary'}
              className="inline-flex shadow-sm iteams-center text-base"
            >
              <span>@{leaderUsername}</span>
              <Avatar className="size-5">
                <AvatarFallback>{leaderUsername[0]}</AvatarFallback>
                <AvatarImage src={leaderAvatarUrl} />
              </Avatar>
            </Badge>
            <span>to build</span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Button variant={'link'}>Join initiatives &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

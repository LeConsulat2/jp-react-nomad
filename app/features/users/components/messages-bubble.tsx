import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { cn } from '~/lib/utils';

interface MessageBubbleProps {
  content: string;
  avatarUrl?: string;
  avatarFallback?: string;
  isCurrentUser?: boolean;
}

export function MessageBubble({
  content,
  avatarUrl = 'https://github.com/serranoarevalo.png',
  avatarFallback = 'SA',
  isCurrentUser = false,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-end gap-4',
        isCurrentUser && 'flex-row-reverse',
      )}
    >
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'bg-accent rounded-md p-2 text-sm w-1/4',
          isCurrentUser && 'bg-primary/20',
        )}
      >
        <p>{content}</p>
      </div>
    </div>
  );
}

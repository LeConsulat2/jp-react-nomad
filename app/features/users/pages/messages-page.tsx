import { Divide, MessageCircleIcon, MessageCircleQuestion } from 'lucide-react';
import type { Route } from './+types/message-page';

export const meta: Route.MetaFunction = () => [
  { title: 'Messages' },
  { name: 'description', content: 'Your messages' },
];

export default function MessagesPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <MessageCircleIcon className="size-10 text-muted-foreground" />
      <h1 className="text-2xl font-semibold">
        Click on a message in the sidebar to start the chats
      </h1>
    </div>
  );
}

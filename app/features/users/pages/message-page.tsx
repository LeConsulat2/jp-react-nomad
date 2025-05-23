import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import type { Route } from './+types/message-page';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Form, useOutletContext } from 'react-router';
import { Textarea } from '~/common/components/ui/textarea';
import { Button } from '~/common/components/ui/button';
import { SendIcon } from 'lucide-react';
import { MessageBubble } from '../components/messages-bubble';
import { makeSSRClient } from '~/supa-client';
import {
  getLoggedInUserId,
  getMessagesByMessagesRoomId,
  getRoomsParticipant,
} from '../queries';

export const Meta: Route.MetaFunction = () => [
  { title: 'Message | We-Create' },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const messages = await getMessagesByMessagesRoomId(client as any, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  const participants = await getRoomsParticipant(client as any, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  return {
    messages,
    participants,
  };
};

export default function MessagePage({ loaderData }: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src={loaderData.participants?.profile?.avatar ?? ''} />
            <AvatarFallback>
              {loaderData.participants?.profile?.name.charAt(0) ?? ''}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>
              {loaderData.participants?.profile?.name ?? ''}
            </CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-4 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {loaderData.messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={message.sender?.avatar ?? ''}
            avatarFallback={message.sender?.name?.charAt(0) ?? ''}
            content={message.content}
            isCurrentUser={message.sender?.profile_id === userId}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea
              placeholder="Type your message here..."
              rows={3}
              className="resize-y"
            />
            <Button type="submit" size="icon" className="absolute ">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}

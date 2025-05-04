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
import { Form } from 'react-router';
import { Textarea } from '~/common/components/ui/textarea';
import { Button } from '~/common/components/ui/button';
import { SendIcon } from 'lucide-react';
import { MessageBubble } from '../components/messages-bubble';

export const Meta: Route.MetaFunction = () => [
  { title: 'Message | We-Create' },
];

export default function MessagePage() {
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/serranoarevalo.png" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-4 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl="https://github.com/serranoarevalo.png"
            avatarFallback="SA"
            content="This is JP and I am an admin but know how to code"
            isCurrentUser={index % 2 === 0}
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

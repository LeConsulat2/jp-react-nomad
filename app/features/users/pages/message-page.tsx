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
import { type Database, browserClient, makeSSRClient } from '~/supa-client';
import {
  getLoggedInUserId,
  getMessagesByMessagesRoomId,
  getRoomsParticipant,
  sendMessageToRoom,
} from '../queries';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';

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

const formSchema = z.object({
  message: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const formData = await request.formData();
  const message = formData.get('message');
  const result = formSchema.safeParse({ message });
  if (!result.success) {
    return { formError: result.error.flatten().fieldErrors.message };
  }
  await sendMessageToRoom(client as any, {
    messageRoomId: params.messageRoomId,
    userId,
    message: result.data.message,
  });
  return { success: 'Message sent' };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, name, avatar } = useOutletContext<{
    userId: string;
    name: string;
    avatar: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 폼 리셋 및 텍스트박스 포커스
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      textareaRef.current?.focus();
    }
  }, [actionData]);

  // 새 메시지 구독
  useEffect(() => {
    const changes = browserClient
      .channel(`room:${userId}-${loaderData.participants?.profile?.profile_id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            payload.new as Database['public']['Tables']['messages']['Row'],
          ]);
        },
      )
      .subscribe();
    return () => {
      changes.unsubscribe();
    };
  }, []);

  // Enter 키로 메시지 전송
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    console.log('keydown:', e.key, 'shift?', e.shiftKey);
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('🚀 submitting form');
      formRef.current?.requestSubmit();
    }
  };

  // 페이지 로드 시와 메시지 추가 시 스크롤 맨 아래로 이동
  useEffect(() => {
    // 약간의 딜레이를 주어 DOM 업데이트 후 스크롤 실행
    const timer = setTimeout(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src={loaderData.participants?.profile?.avatar ?? ''} />
            <AvatarFallback>
              {(loaderData.participants?.profile?.name || '').charAt(0)}
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
      <div
        ref={messageContainerRef}
        className="py-4 overflow-y-scroll space-y-4 flex flex-col justify-start h-full scrollbar-visible"
        style={{
          overflowY: 'scroll',
          scrollbarWidth: 'thin',
          msOverflowStyle: 'auto',
        }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={
              message.sender_id === userId
                ? avatar
                : loaderData.participants?.profile?.avatar ?? ''
            }
            avatarFallback={
              message.sender_id === userId
                ? name.charAt(0)
                : (loaderData.participants?.profile?.name || '').charAt(0)
            }
            content={message.content || ''}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <Form
            ref={formRef}
            className="relative flex justify-end items-center"
            method="post"
            onSubmit={() => {
              // 폼 제출 시 바로 텍스트 영역 초기화 (UX 개선)
              setTimeout(() => {
                textareaRef.current?.focus();
              }, 0);
            }}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Type your message here..."
              rows={3}
              required
              name="message"
              className="resize-y"
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
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

export const shouldRevalidate = () => false;

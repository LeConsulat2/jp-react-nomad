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

/**
 * 메시지 페이지 로더 함수
 * 특정 메시지룸의 메시지와 참여자 정보를 불러옴
 */
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

/**
 * 메시지 입력 폼 검증 스키마
 * 최소 1자 이상의 메시지를 요구함
 */
const formSchema = z.object({
  message: z.string().min(1),
});

/**
 * 메시지 전송 액션 함수
 * 폼 데이터를 검증하고 메시지를 저장함
 */
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
  // ==================== 상태 관리 ====================
  // 메시지 목록 상태 (실시간 업데이트를 위해 useState 사용)
  const [messages, setMessages] = useState(loaderData.messages);

  // 현재 사용자 정보를 Outlet 컨텍스트에서 가져옴
  const { userId, name, avatar } = useOutletContext<{
    userId: string;
    name: string;
    avatar: string;
  }>();

  // ==================== Refs 선언 ====================
  // 폼, 메시지 컨테이너, 텍스트 영역에 대한 참조
  const formRef = useRef<HTMLFormElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ==================== 이벤트 핸들러 ====================
  // Enter 키로 메시지 전송하는 핸들러
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter + Shift가 아니면 메시지 전송
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // submit() 메서드 사용
      formRef.current?.submit();
    }
  };

  // ==================== 부수 효과 (Effects) ====================
  // 폼 제출 성공 시 입력창 초기화 및 포커스 효과
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      textareaRef.current?.focus();
    }
  }, [actionData]);

  // 실시간 메시지 업데이트를 위한 Supabase 구독 설정
  useEffect(() => {
    // 메시지룸 채널을 구독 (사용자 ID와 대화 상대 ID를 조합하여 채널명 생성)
    const changes = browserClient
      .channel(`room:${userId}-${loaderData.participants?.profile?.profile_id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // 새 메시지 추가 이벤트만 구독
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          // 새 메시지가 추가되면 메시지 목록 업데이트
          setMessages((prev) => [
            ...prev,
            payload.new as Database['public']['Tables']['messages']['Row'],
          ]);
        },
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      changes.unsubscribe();
    };
  }, []);

  // 자동 스크롤 효과: 메시지 추가 시 항상 맨 아래로 스크롤
  useEffect(() => {
    // 약간의 딜레이를 주어 DOM 업데이트 후 스크롤 실행
    const timer = setTimeout(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    }, 100);

    // 타이머 정리 함수
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="h-full flex flex-col justify-between">
      {/* ==================== 상단 헤더 카드 ==================== */}
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

      {/* ==================== 메시지 표시 영역 ==================== */}
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

      {/* ==================== 메시지 입력 폼 ==================== */}
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

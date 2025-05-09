import { DotIcon, EyeIcon, HeartIcon, LockIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import { cn } from '~/lib/utils';

interface IdeaCardProps {
  id: number; // 아이디어의 고유 ID
  title: string; // 아이디어 제목
  viewsCount: number; // 조회 수
  postedAt: string; // 게시된 시간
  likesCount: number; // 좋아요 수
  claimed?: boolean; // 아이디어가 이미 Claim 되었는지 여부 (선택적 필드)
}

export function IdeaCard({
  id,
  title,
  viewsCount,
  postedAt,
  likesCount,
  claimed,
}: IdeaCardProps) {
  return (
    // 카드 전체 레이아웃
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      {/* 카드 상단 (헤더) */}
      <CardHeader>
        {/* 제목을 클릭하면 아이디어 상세 페이지로 이동 */}
        <Link to={`/ideas/${id}`}>
          <CardTitle className="text-xl">
            {/* 아이디어 제목 표시 */}
            {/* 이미 Claimed 된 아이디어는 흐릿한 스타일로 표시 */}
            <span
              className={cn(
                claimed
                  ? 'bg-muted-foreground selection:bg-muted-foreground text-muted-foreground'
                  : '',
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>

      {/* 카드 본문 (콘텐츠) */}
      <CardContent className="flex items-center text-sm">
        {/* 조회 수 표시 */}
        <div className="flex items-center gap-1">
          <EyeIcon className="w-4 h-4" />
          <span>{viewsCount}</span>
          <DotIcon className="w-4 h-4" />
          <span>{DateTime.fromISO(postedAt).toRelative()}</span>
        </div>
        {/* 조회 수와 다른 정보 구분하는 점 아이콘 */}
        <DotIcon />
      </CardContent>

      {/* 카드 하단 (푸터) */}
      <CardFooter>
        {/* 좋아요 수 표시 버튼 */}
        <Button variant="outline">
          <HeartIcon className="w-4 h-4" />
          <span>{likesCount}</span>
        </Button>

        {/* 아이디어 상태에 따라 다른 버튼 렌더링 */}
        {!claimed ? (
          // 아직 Claim 되지 않은 경우: "Claim the idea" 버튼
          <Button asChild>
            <Link to={`/ideas/${id}/claim`}>Claim the idea &rarr;</Link>
          </Button>
        ) : (
          // 이미 Claimed 된 경우: 비활성화된 버튼 표시
          <Button variant="outline" disabled className="cursor-not-allowed">
            <LockIcon className="size-4" />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

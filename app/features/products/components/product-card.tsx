import { Link } from 'react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card'; // 카드 레이아웃과 스타일 컴포넌트
import { Button } from '~/common/components/ui/button'; // 버튼 컴포넌트
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from 'lucide-react'; // 아이콘 라이브러리

// ProductCard가 받아야 할 모든 prop을 정의합니다.
interface ProductCardProps {
  id: string; // 상품 상세 페이지로 이동할 때 사용할 고유 ID
  name: string; // 상품 이름
  description: string; // 상품 설명
  commentsCount: number; // 댓글 개수
  viewsCount: number; // 조회수
  votesCount: number; // 추천(투표) 수
}

export function ProductCard({
  id,
  name,
  description,
  commentsCount,
  viewsCount,
  votesCount,
}: ProductCardProps) {
  return (
    // Link: 클릭 시 `/products/{id}` 경로로 이동합니다.
    <Link to={`/products/${id}`} className="block">
      {/* Card: 간격, 배경, hover 효과가 적용된 컨테이너 */}
      <Card className="w-full flex items-center justify-between bg-transparent hover:bg-card/50 transition-colors">
        {/* CardHeader: 제목, 설명, 통계(댓글/조회)를 담는 부분 */}
        <CardHeader>
          {/* CardTitle: 상품 이름 */}
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            {name}
          </CardTitle>

          {/* CardDescription: 상품 설명 */}
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>

          {/* 댓글 및 조회수 표시 */}
          <div className="flex items-center gap-4 mt-2">
            {/* 댓글 아이콘 + 개수 */}
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <MessageCircleIcon className="w-4 h-4" />
              <span>{commentsCount}</span>
            </div>

            {/* 조회수 아이콘 + 개수 */}
            <div className="flex items-center gap-px text-xs text-muted-foreground">
              <EyeIcon className="w-4 h-4" />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>

        {/* CardFooter: 투표 버튼을 담는 부분 */}
        <CardFooter className="py-0">
          {/* Button: 세로 정렬된 아이콘 + 숫자 */}
          <Button variant="outline" className="flex flex-col h-14">
            <ChevronUpIcon className="size-4 shrink-0" />{' '}
            {/* 위쪽 화살표 아이콘 */}
            <span>{votesCount}</span> {/* 투표 수 */}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

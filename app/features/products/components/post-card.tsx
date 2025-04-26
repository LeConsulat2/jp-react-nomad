import { Link } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Button } from '~/common/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';

// PostCard 컴포넌트가 받을 props(속성)들의 타입을 정의합니다.
interface PostCardProps {
  id: string; // 게시글 ID (URL 이동에 사용)
  title: string; // 게시글 제목
  author: string; // 작성자 이름
  authorAvatarUrl: string; // 작성자 프로필 이미지 URL
  category: string; // 게시글 카테고리 (예: Productivity)
  postedAt: string; // 게시글 작성 시간 (예: '12 hours ago')
}

// --- PostCard 컴포넌트 ---
// 커뮤니티에 올라온 게시글을 카드 형태로 보여주는 컴포넌트입니다.
export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  postedAt,
}: PostCardProps) {
  return (
    // 전체 카드를 클릭할 수 있도록 Link로 감쌉니다.
    // 클릭 시 `/community/{id}` 경로로 이동합니다.
    <Link to={`/community/${id}`}>
      {/* 카드 전체 영역 */}
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        {/* 카드 헤더 영역 (상단) */}
        <CardHeader className="flex flex-row items-center gap-2">
          {/* 작성자 프로필 아바타 */}
          <Avatar className="size-14">
            {/* 이미지가 없을 경우 첫 글자(author[0])를 표시합니다. */}
            <AvatarFallback>{author[0]}</AvatarFallback>
            {/* 프로필 이미지가 있을 경우 보여줍니다. */}
            {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
          </Avatar>

          {/* 작성자 이름, 게시글 제목, 카테고리, 작성 시간 */}
          <div>
            {/* 게시글 제목 */}
            <CardTitle>{title}</CardTitle>

            {/* 작성자 정보 및 작성 시간 */}
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>
                {/* 예시: Nico on Productivity */}
                {author} on {category}
              </span>
              <span>👉</span> {/* 시각적으로 구분해주는 아이콘 */}
              <span>{postedAt}</span> {/* 작성 시간 표시 */}
            </div>
          </div>
        </CardHeader>

        {/* 카드 푸터 영역 (하단) */}
        <CardFooter className="flex justify-end">
          {/* 'Reply' 버튼 - 답글을 달기 위해 게시글로 이동 */}
          <Button variant="link" asChild>
            <Link to={`/community/${id}`}>Reply &rarr;</Link>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

import { Link } from 'react-router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Badge } from '~/common/components/ui/badge';

// JobCard 컴포넌트가 받을 props 타입 정의
interface JobCardProps {
  id: number; // 구인 공고 id
  company: string; // 회사 이름
  companyLogoUrl: string; // 회사 로고 URL
  companyHq: string; // 회사 본사 위치
  title: string; // 직무 제목
  postedAt: string; // 게시된 시간
  type: string; // 고용 형태 (ex: Full-time)
  positionLocation: string; // 근무 위치 (ex: Remote)
  salary: string; // 급여 범위
}

// JobCard 컴포넌트
export function JobCard({
  id,
  company,
  companyLogoUrl,
  companyHq,
  title,
  postedAt,
  type,
  positionLocation,
  salary,
}: JobCardProps) {
  return (
    // 카드 전체를 클릭할 수 있게 Link로 감쌈
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader>
          {/* 회사 로고 + 회사명 + 게시된 시간 */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={companyLogoUrl}
              alt={`${company} Logo`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{company}</span>
              <span className="text-xs text-muted-foreground">{postedAt}</span>
            </div>
          </div>

          {/* 직무 제목 */}
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>
          {/* 고용 형태, 근무 위치를 Badge로 표시 */}
          <Badge variant="outline" className="capitalize">
            {type}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {positionLocation}
          </Badge>
        </CardContent>

        <CardFooter className="flex justify-between">
          {/* 급여와 본사 위치 */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {salary}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {companyHq}
            </span>
          </div>

          {/* 지원하기 버튼 */}
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

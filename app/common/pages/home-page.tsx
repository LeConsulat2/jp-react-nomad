import { Link, type MetaFunction, type LoaderFunctionArgs } from 'react-router';

import { ProductCard } from '~/features/products/components/product-card';
import { Button } from '../components/ui/button';
import { PostCard } from '~/features/products/components/post-card';
import { IdeaCard } from '~/features/products/components/idea-card';
import { JobCard } from '~/features/products/components/job-card';
import { TeamCard } from '~/features/products/components/team-card';
import type { ComponentProps } from 'react'; // Using React.ComponentProps as placeholder
import type { Route } from './+types/home-page';

// ==================================================
// 🌐 메타데이터 설정
// ==================================================
export function meta(): ReturnType<MetaFunction> {
  // Use standard MetaFunction return type
  return [
    { title: 'Home | We-Create' },
    { name: 'description', content: 'Welcome to We-Create' },
  ];
}

// ==================================================
// 🏠 HomePage 컴포넌트
// ==================================================
export default function HomePage({ loaderData }: Route.ComponentProps) {
  // Use placeholder ComponentProps
  // Default export, use Route.ComponentProps
  return (
    // 전체 레이아웃을 감싸는 최상위 div입니다.
    // 좌우 여백을 'px-20', 섹션 간 간격을 'space-y-40'으로 설정합니다.
    <div className=" px-20 space-y-40">
      {/* ==================================================
          🛍️ Today's Products 섹션
          ================================================== */}
      <div className="grid grid-cols-3 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
          {/* 'Explore all products' 링크 버튼 */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>

        {/* 오른쪽 두 번째, 세 번째 컬럼: ProductCard 리스트 */}
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>

      {/* ==================================================
          💬 Latest Discussions 섹션
          ================================================== */}
      <div className="grid grid-cols-3 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions from our community.
          </p>
          {/* 'Explore all discussions' 링크 버튼 */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>

        {/* 오른쪽 두 번째, 세 번째 컬럼: PostCard 리스트 */}
        {Array.from({ length: 11 }).map((_, index) => (
          <PostCard
            key={`postId-${index}`}
            id={`postId-${index}`}
            title="What is the best productivity tool?"
            author="Jonathan"
            authorAvatarUrl=""
            category="Productivity"
            postedAt="12 hours ago"
          />
        ))}
      </div>

      {/* ==================================================
          💡 IdeasGPT 섹션
          ================================================== */}
      <div className="grid grid-cols-3 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold text-foreground">IdeasGPT</h2>
          <p className="text-xl font-light text-foreground">
            Find your next ideas!
          </p>
          {/* 'Explore All Ideas' 링크 버튼 */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore All Ideas! &rarr;</Link>
          </Button>
        </div>

        {/* 오른쪽 두 번째, 세 번째 컬럼: IdeaCard 리스트 */}
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewsCount={123}
            postedAt="10 hours ago"
            likesCount={10}
            claimed={index % 2 === 0}
          />
        ))}
      </div>

      {/* ==================================================
          🧑‍💼 Latest Jobs 섹션
          ================================================== */}
      <div className="grid grid-cols-4 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find your dream job.
          </p>
          {/* 'Explore all jobs' 링크 버튼 */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>

        {/* 오른쪽 세 컬럼: JobCard 리스트 */}
        {Array.from({ length: 11 }).map((_, index) => (
          <JobCard
            key={`jobId-${index}`}
            id={`jobId-${index}`}
            company="AUT"
            companyLogoUrl="https://github.com/mit.png"
            companyHq="AUT University"
            title="Counsellor"
            postedAt="9 hours ago"
            type="Full-time"
            positionLocation="Remote"
            salary="$90,000 - $120,000"
          />
        ))}
      </div>

      {/* ==================================================
          👥 Find a Team Crew 섹션
          ================================================== */}
      <div className="grid grid-cols-4 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team crew
          </h2>
          <p className="text-xl font-light text-foreground">
            Browse and join a group
          </p>
          {/* 'Discover all initiatives' 링크 버튼 */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Discover all initiatives & teams</Link>
          </Button>
        </div>

        {/* 오른쪽 세 컬럼: TeamCard 리스트 */}
        {Array.from({ length: 3 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            id={`teamId-${index}`}
            leaderUsername="Jin"
            leaderAvatarUrl=""
            positions={[
              'Counsellor',
              'Occupational Therapist',
              'Physiotherapist',
            ]}
            projectDescription="Creating and contributing platform"
          />
        ))}
      </div>
    </div>
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  // Implement your loader logic here
  console.log('Home Page Loader Request:', request);
  return {};
}

/* 
<main className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
  <div className="max-w-3xl text-center">
    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
      Welcome to <span className="italic">We-Create</span>
    </h1>
    <p className="text-xl sm:text-2xl font-light mb-6 leading-relaxed text-gray-300">
      Share your ideas. Build your Portfolios. Get the latest weekly AI updates
      and daily sparks from <strong className="text-white">IdeasGPT</strong>.
    </p>
    <p className="text-md sm:text-lg mb-8 text-gray-400">
      Get started by exploring our features or sign in to your account.
    </p>
    <div className="flex justify-center gap-4">
      <Button variant="default" className="text-lg px-6 py-3">
        Get Started
      </Button>
      <Button
        variant="outline"
        className="text-lg px-6 py-3 border-gray-500 text-gray-300 hover:text-white"
      >
        Learn More
      </Button>
    </div>
  </div>
</main> */

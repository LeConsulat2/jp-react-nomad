import { Link, type MetaFunction } from 'react-router';
import { Button } from '../components/ui/button';
import { getProductsByDateRange } from '~/features/products/queries';
import { DateTime } from 'luxon';
import type { Route } from './+types/home-page';
import { getPosts } from '~/features/community/queries';
import { getGptIdeas } from '~/features/ideas/queries';
import { getJobs } from '~/features/jobs/queries';
import { getTeams } from '~/features/teams/queries';
import { makeSSRClient } from '~/supa-client';
import Navigation from '../components/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from '../components/ui/sidebar';
import { useIsMobile } from '~/hooks/use-mobile';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | We-Create' },
    { name: 'description', content: 'Welcome to We-Create' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const products = await getProductsByDateRange(client as any, {
    startDate: DateTime.now().startOf('day'),
    endDate: DateTime.now().endOf('day'),
    limit: 7,
  });
  const posts = await getPosts(client as any, {
    limit: 7,
    sorting: 'newest',
  });
  const ideas = await getGptIdeas(client as any, { limit: 7 });
  const jobs = await getJobs(client as any, { limit: 11 });
  const teams = await getTeams(client as any, { limit: 7 });
  return { products, posts, ideas, jobs, teams };
};
// ==================================================
// 🏠 HomePage 컴포넌트
// ==================================================
export default function HomePage() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      {/* 1. 상단 네비게이션 (고정, 메인 콘텐츠와 겹치지 않음) */}
      <header>
        {/* 데스크탑: 풀 네비게이션, 모바일: 숨김 */}
        <div className="hidden md:block fixed top-0 left-0 right-0 z-50">
          <Navigation
            isLoggedIn={false}
            hasNotifications={false}
            hasMessages={false}
          />
        </div>
        {/* 모바일: 햄버거 버튼만 오른쪽 상단에 고정 */}
        {isMobile && (
          <div className="fixed right-4 top-4 z-50 md:hidden">
            <SidebarTrigger />
          </div>
        )}
      </header>

      {/* 2. 메인 콘텐츠 (항상 화면 중앙에 위치) */}
      <main className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
        <div className="max-w-3xl text-center mx-auto">
          {/* 메인 타이틀 */}
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to <span className="italic">We-Create</span>
          </h1>
          {/* 설명 텍스트 */}
          <p className="text-xl sm:text-2xl font-light mb-6 leading-relaxed text-gray-300">
            Share your ideas. Build your Portfolios. Get the latest weekly AI
            updates and daily sparks from{' '}
            <strong className="text-white">IdeasGPT</strong>.
          </p>
          {/* 서브 텍스트 */}
          <p className="text-md sm:text-lg mb-8 text-gray-400">
            Get started by exploring our features or sign in to your account.
          </p>
          {/* 버튼 그룹 (항상 중앙에 보임) */}
          <div className="flex justify-center gap-4 w-full">
            <Button variant="default" className="text-lg px-6 py-3" asChild>
              <Link to="/auth/login">Get Started</Link>
            </Button>
            <Button variant="secondary" className="text-lg px-6 py-3" asChild>
              <Link to="/auth/join">Join</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* 3. 모바일 메뉴 (햄버거 눌렀을 때만 열림, 데스크탑에서는 렌더링 X) */}
      {isMobile && (
        <Sidebar side="right">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block py-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="block py-2">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="block py-2">
                  Jobs
                </Link>
              </li>
              {/* ...필요한 메뉴 추가... */}
            </ul>
          </div>
        </Sidebar>
      )}
    </SidebarProvider>
  );
}

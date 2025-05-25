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
  return (
    // 1. SidebarProvider로 전체 감싸기
    <SidebarProvider>
      {/* 2. 중앙 메인 콘텐츠 */}
      <main className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 relative">
        {/* 3. 오른쪽 상단 햄버거 버튼 (모바일에서만 보임) */}
        <div className="absolute right-4 top-4 md:hidden z-50">
          <SidebarTrigger />
        </div>
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
          {/* 버튼 그룹 */}
          <div className="flex justify-center gap-4 w-full">
            <Button variant="default" className="text-lg px-6 py-3" asChild>
              <Link to="/auth/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
      {/* 4. 오른쪽에서 슬라이드되는 Sidebar 메뉴 */}
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
    </SidebarProvider>
  );
}

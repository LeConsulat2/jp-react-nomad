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
    // SidebarProvider로 전체 감싸기 (모바일/PC 모두 대응)
    <SidebarProvider>
      {/* 상단 네비게이션 + 모바일 햄버거 버튼 */}
      <div className="relative">
        {/* 모바일에서만 보이는 햄버거 버튼 */}
        <div className="absolute left-4 top-4 md:hidden z-50">
          <SidebarTrigger />
        </div>
        {/* 네비게이션 바 (PC/모바일 공통) */}
        <Navigation
          isLoggedIn={false}
          hasNotifications={false}
          hasMessages={false}
        />
      </div>

      {/* Sidebar(모바일 메뉴) - 원하는 메뉴 내용 넣기 */}
      <Sidebar>
        {/* 여기에 메뉴 내용(링크 등) 추가 */}
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

      {/* 기존 메인 콘텐츠 */}
      <main className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
        <div className="max-w-3xl text-center">
          {/* ...기존 내용 유지... */}
        </div>
      </main>
    </SidebarProvider>
  );
}

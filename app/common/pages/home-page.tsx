import { Link, type MetaFunction } from 'react-router';
import { ProductCard } from '~/features/products/components/product-card';
import { Button } from '../components/ui/button';
import { PostCard } from '~/features/community/components/post-card';
import { IdeaCard } from '~/features/ideas/components/idea-card';
import { JobCard } from '~/features/jobs/components/job-card';
import { TeamCard } from '~/features/teams/components/team-card';
import { getProductsByDateRange } from '~/features/products/queries';
import { DateTime } from 'luxon';
import type { Route } from './+types/home-page';
import { getPosts } from '~/features/community/queries';
import { getGptIdeas } from '~/features/ideas/queries';
import { getJobs } from '~/features/jobs/queries';
import { getTeams } from '~/features/teams/queries';
import { makeSSRClient } from '~/supa-client';

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
    <main className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
      <div className="max-w-3xl text-center">
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
            <Link to="/login">Get Started</Link>
          </Button>
          {/* <Button
            variant="outline"
            className="text-lg px-6 py-3 border-gray-500 text-gray-300 hover:text-white"
          >
            Learn More
          </Button> */}
        </div>
      </div>
    </main>
  );
}

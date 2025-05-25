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
import { FlickeringGrid } from 'components/magicui/flickering-grid';

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
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div>
        <FlickeringGrid
          color="#E2254F"
          columns={30}
          cellSize={10}
          speed={1.5}
          opacity={0.8}
        />

        {/* Foreground Content */}
        <main className="relative z-10 flex items-center justify-center min-h-[100vh] px-6 text-white bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="max-w-3xl text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
              Welcome to <span className="italic">We-Create</span>
            </h1>

            <p className="text-xl sm:text-2xl font-light mb-6 leading-relaxed text-gray-300">
              Share your ideas. Build your Portfolios. Get the latest weekly AI
              updates and daily sparks from{' '}
              <strong className="text-white">IdeasGPT</strong>.
            </p>

            <p className="text-md sm:text-lg mb-8 text-gray-400">
              Get started by exploring our features or sign in to your account.
            </p>

            <div className="flex justify-center gap-4 w-full">
              <Button variant="default" className="text-lg px-6 py-3" asChild>
                <Link to="/auth/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

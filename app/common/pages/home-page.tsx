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

// ==================================================
// 🌐 메타데이터 설정
// ==================================================
export const meta: MetaFunction = () => {
  return [
    { title: 'Home | We-Create' },
    { name: 'description', content: 'Welcome to We-Create' },
  ];
};

export const loader = async () => {
  const [products, posts] = await Promise.all([
    getProductsByDateRange({
      startDate: DateTime.now().startOf('day'),
      endDate: DateTime.now().endOf('day'),
      limit: 7,
    }),
    getPosts({
      limit: 7,
      sorting: 'newest',
    }),
  ]);

  const teams = Array.from({ length: 3 }).map((_, index) => ({
    id: index + 1,
    leaderUsername: 'Jin',
    leaderAvatarUrl: '',
    positions: ['Counsellor', 'Occupational Therapist', 'Physiotherapist'],
    projectDescription: 'Creating and contributing platform',
  }));

  return { products, posts, teams };
};

// ==================================================
// 🏠 HomePage 컴포넌트
// ==================================================
export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-20 space-y-40">
      {/* ==================================================
          🛍️ Today's Products 섹션
          ================================================== */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>

      {/* ==================================================
          💬 Latest Discussions 섹션
          ================================================== */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions from our community.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            author={post.author}
            authorAvatarUrl={post.author_avatar}
            category={post.topic_slug}
            postedAt={post.created_at}
            votesCount={post.upvotes}
          />
        ))}
      </div>

      {/* ==================================================
          💡 IdeasGPT 섹션
          ================================================== */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold text-foreground">IdeasGPT</h2>
          <p className="text-xl font-light text-foreground">
            Find your next ideas!
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore All Ideas! &rarr;</Link>
          </Button>
        </div>
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
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find your dream job.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
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
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team crew
          </h2>
          <p className="text-xl font-light text-foreground">
            Browse and join a group
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Discover all initiatives & teams</Link>
          </Button>
        </div>
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.id}
            id={team.id}
            leaderUsername={team.leaderUsername}
            leaderAvatarUrl={team.leaderAvatarUrl}
            positions={team.positions}
            projectDescription={team.projectDescription}
          />
        ))}
      </div>
    </div>
  );
}

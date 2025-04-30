import { ChevronUpIcon, StarIcon } from 'lucide-react';
import type { Route } from '../../../../+types/features/products/pages/product-overview-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'Product Overview | We-Create' },
    { name: 'description', content: 'View detailed product information' },
  ];
};

export default function ProductOverviewPage({
  params: { productId },
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-4xl font-bold">Product Name</h1>
            <p className="text-lg font-light">Product Description</p>
            <div className="flex mt-5 items-center gap-3">
              <div className="flex text-yellow ">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon className="size-6" fill="currentColor" />
                ))}
              </div>
              <span className="text-muted-foreground text-lg">42 reviews</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="text-lg h-14 px-8">
            Visit & view the portfolio
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg h-14 px-8 bg-gradient-to-t from-violet-500 to-violet-400 text-white"
          >
            <ChevronUpIcon className="size-4" />
            Upvote (33)
          </Button>
        </div>
      </div>
      <div className="max-w-prose">
        <div className="flex gap-3">
          <Button variant={'ghost'}>
            <Link to={`/products/${productId}/overview`}>Overview</Link>
          </Button>
          <Button variant={'ghost'}>
            <Link to={`/products/${productId}/reviews`}>Reviews</Link>
          </Button>
        </div>
        <div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              What is your portfolio about?
            </h3>
            <p className="text-muted-foreground text-lg">
              Counselling and therapy for children and adolescents.
            </p>
          </div>

          <div className="space-y-6 ">
            <h3 className="text-2xl font-bold">
              What makes your practice different?
            </h3>
            <p className="text-muted-foreground text-lg">
              I focus on creating emotionally safe, culturally sensitive
              environments where young clients can explore their thoughts and
              experiences freely. My sessions integrate evidence-based methods
              with intuitive connection, ensuring each child feels seen and
              supported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

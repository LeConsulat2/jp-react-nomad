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
    <div className="space-y-10 px-6 py-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/30 border border-primary/40" />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Product Name
            </h1>
            <p className="text-lg font-light text-foreground/80">
              Product Description
            </p>
            <div className="flex mt-5 items-center gap-3">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-5" fill="currentColor" />
                ))}
              </div>
              <span className="text-muted-foreground text-base">
                42 reviews
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Button className="text-base font-medium h-12 px-6 rounded-xl shadow-sm">
            Visit & view the portfolio
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base h-12 px-6 bg-gradient-to-t from-violet-500 to-violet-400 text-white rounded-xl shadow-md hover:brightness-110 transition"
          >
            <ChevronUpIcon className="size-4 mr-1" />
            Upvote (33)
          </Button>
        </div>
      </div>

      <div className="max-w-prose">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="text-sm px-4 text-muted-foreground"
          >
            <Link to={`/products/${productId}/overview`}>Overview</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-sm px-4 text-muted-foreground"
          >
            <Link to={`/products/${productId}/reviews`}>Reviews</Link>
          </Button>
        </div>

        <div className="pt-6 space-y-10">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              What is your portfolio about?
            </h3>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Counselling and therapy for children and adolescents.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              What makes your practice different?
            </h3>
            <p className="text-lg text-foreground/80 leading-relaxed">
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

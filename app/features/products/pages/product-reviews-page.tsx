import { Button } from '~/common/components/ui/button';
import { ReviewCard } from '../components/review-card';
import { Dialog, DialogTrigger } from '~/common/components/ui/dialog';
import CreateReviewDialogue from '../components/create-review-dialogue';
import { NavLink, useParams } from 'react-router';

export function meta() {
  return [
    { title: 'Product Reviews | wemake' },
    { name: 'description', content: 'Read and write product reviews' },
  ];
}

export default function ProductReviewsPage() {
  const { productId } = useParams();

  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        {/* Navigation */}
        <div className="flex gap-2">
          <NavLink
            to={`/products/${productId}/overview`}
            className={({ isActive }) =>
              `
              text-sm px-4 py-2 rounded-lg border 
              transition shadow-sm
              ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-muted text-muted-foreground border-transparent hover:border-muted-foreground'
              }
              `
            }
          >
            Overview
          </NavLink>

          <NavLink
            to={`/products/${productId}/reviews`}
            className={({ isActive }) =>
              `
              text-sm px-4 py-2 rounded-lg border 
              transition shadow-sm
              ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-muted text-muted-foreground border-transparent hover:border-muted-foreground'
              }
              `
            }
          >
            Reviews
          </NavLink>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">10 Reviews </h2>
          <DialogTrigger>
            <Button variant={'secondary'}>Write a review</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <ReviewCard
              key={i}
              username="John Doe"
              handle="@username"
              avatarUrl="https://github.com/facebook.png"
              rating={5}
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
              postedAt="10 days ago"
            />
          ))}
        </div>
        <CreateReviewDialogue />
      </div>
    </Dialog>
  );
}

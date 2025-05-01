import { ChevronUpIcon, StarIcon } from 'lucide-react';
import { Outlet } from 'react-router';
import { Button } from '~/common/components/ui/button';

export default function ProductOverviewLayout() {
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
      <Outlet />
    </div>
  );
}

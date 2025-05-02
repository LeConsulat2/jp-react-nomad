import { data, Form } from 'react-router';
import { z } from 'zod';
import type { Route } from './+types/search-page';
import { Hero } from '~/common/components/Hero';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/product-card';
import ProductPagination from '~/common/components/product-pagination';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Search Products | We-Create' },
    { name: 'description', content: 'Search for products' },
  ];
};

const paramsSchema = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error('Invalid params');
  } else {
    return parsedData;
  }
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <Hero
        title="Search Portfolios"
        subtitle="Search for Portfolios by title or description"
      />

      {/* Search Bar */}
      <div className="mt-8 flex justify-center">
        <Form method="get" className="w-full max-w-2xl">
          <div className="bg-card rounded-2xl shadow-md p-6 flex gap-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Search className="w-5 h-5" />
              </span>
              <Input
                type="text"
                name="query"
                className="pl-10 pr-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Search for portfolios..."
                autoComplete="off"
              />
            </div>
            <Button type="submit" className="text-base px-6 py-2 rounded-md">
              Search
            </Button>
          </div>
        </Form>
      </div>

      {/* Search Results */}
      <div className="mt-10 space-y-6 w-full max-w-4xl mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            id={`productId-${index}`}
            name="Portfolio Name"
            description="Portfolio Description"
            commentsCount={5}
            viewsCount={1000}
            votesCount={100}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <ProductPagination totalPages={9} />
      </div>
    </div>
  );
}

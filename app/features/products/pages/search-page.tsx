import { data, Form } from 'react-router';
import { z } from 'zod';
import type { Route } from './+types/search-page';
import { Hero } from '~/common/components/Hero';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/product-card';
import ProductPagination from '~/common/components/product-pagination';
import { getPagesBySearch, getProductsBySearch } from '../queries';
import { getProductsByDateRange } from '../queries';
import { DateTime } from 'luxon';

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

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error('Invalid params');
  }

  // 빈 검색어인 경우 기본 제품 목록 가져오기 (최신 제품들)
  if (parsedData.query === '') {
    const products = await getProductsByDateRange({
      startDate: DateTime.now().startOf('month'), // 최근 1개월 제품
      endDate: DateTime.now(),
      limit: 10, // 원하는 개수로 조정
      page: parsedData.page,
    });

    // 전체 제품 페이지 수 계산 (또는 고정값 사용)
    // 실제로는 모든 제품의 페이지 수를 계산하는 함수를 호출해야 합니다
    const totalPages = 5; // 임시로 5페이지로 설정

    return {
      products,
      totalPages,
      isDefaultSearch: true, // 기본 검색임을 표시
    };
  }

  // 검색어가 있는 경우 기존 검색 로직 사용
  const products = await getProductsBySearch({
    query: parsedData.query,
    page: parsedData.page,
  });
  const totalPages = await getPagesBySearch({ query: parsedData.query });

  return {
    products,
    totalPages,
    isDefaultSearch: false,
  };
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

      {/* 검색 상태 표시 */}
      {loaderData.isDefaultSearch && (
        <div className="mt-4 text-center text-muted-foreground">
          Showing recent products. Enter keywords to search.
        </div>
      )}

      {/* Search Results */}
      <div className="mt-10 space-y-6 w-full max-w-4xl mx-auto">
        {loaderData.products.length > 0 ? (
          loaderData.products.map((product) => (
            <ProductCard
              key={product.product_id}
              id={product.product_id}
              name={product.name}
              description={product.tagline}
              reviewsCount={product.reviews}
              viewsCount={product.views}
              votesCount={product.upvotes}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No products found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <ProductPagination totalPages={loaderData.totalPages} />
      </div>
    </div>
  );
}

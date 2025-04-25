// React Router에서 meta 정보를 정의할 때 사용할 타입을 가져옵니다.
import type { MetaFunction } from 'react-router';
// ProductCard 컴포넌트를 경로에 맞게 가져옵니다.
import { ProductCard } from '~/features/products/components/product-card';

// <head>에 들어갈 메타 태그 정보를 설정합니다.
export const meta: MetaFunction = () => {
  return [
    { title: 'Home | wemake' }, // 브라우저 탭에 표시될 페이지 제목
    { name: 'description', content: 'Welcome to wemake' }, // SEO용 페이지 설명
  ];
};

// HomePage 컴포넌트: 메인 홈 화면을 렌더링합니다.
export default function HomePage() {
  return (
    // 좌우 여백을 px-20으로 설정해 콘텐츠가 화면 양쪽에 붙지 않도록 합니다.
    <div className="px-20">
      {/* 3열 그리드 레이아웃, 아이템 간격은 gap-4 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 첫 번째 열: 제목과 서브텍스트 */}
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
        </div>

        {/* 나머지 열: ProductCard 컴포넌트를 배열로 10개 렌더링 */}
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index} // React 리스트 렌더링 시 고유 key 필수
            id={`productId-${index}`} // 각 카드에 전달할 고유 상품 ID
            name="Product Name" // 카드에 표시할 상품명
            description="Product Description" // 카드에 표시할 상품 설명
            commentsCount={12} // 댓글 수
            viewsCount={12} // 조회 수
            votesCount={120} // 추천(투표) 수
          />
        ))}
      </div>
    </div>
  );
}

/*
<main className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
  <div className="max-w-3xl text-center">
    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
      Welcome to <span className="italic">We-Create</span>
    </h1>
    <p className="text-xl sm:text-2xl font-light mb-6 leading-relaxed text-gray-300">
      Share your ideas. Build your Portfolios. Get the latest weekly AI updates
      and daily sparks from <strong className="text-white">IdeasGPT</strong>.
    </p>
    <p className="text-md sm:text-lg mb-8 text-gray-400">
      Get started by exploring our features or sign in to your account.
    </p>
    <div className="flex justify-center gap-4">
      <Button variant="default" className="text-lg px-6 py-3">
        Get Started
      </Button>
      <Button
        variant="outline"
        className="text-lg px-6 py-3 border-gray-500 text-gray-300 hover:text-white"
      >
        Learn More
      </Button>
    </div>
  </div>
</main>
*/

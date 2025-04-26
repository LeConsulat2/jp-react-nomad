import { Link, type MetaFunction } from 'react-router';
import { ProductCard } from '~/features/products/components/product-card';
import { Button } from '../components/ui/button';
import { PostCard } from '~/features/products/components/post-card';
import { IdeaCard } from '~/features/products/components/idea-card';
import { index } from '@react-router/dev/routes';

// --- 메타데이터 설정 ---
// 페이지의 <head> 영역에 들어갈 메타 정보를 설정하는 함수입니다.
// 주로 SEO(검색엔진 최적화)와 브라우저 탭 제목을 설정하는 데 사용합니다.
export const meta: MetaFunction = () => {
  return [
    { title: 'Home | We-Create' }, // 브라우저 탭에 표시될 페이지 제목
    { name: 'description', content: 'Welcome to We-Create' }, // 검색 엔진에 노출될 페이지 설명
  ];
};

// --- HomePage 컴포넌트 ---
// 메인 홈페이지 화면을 구성하는 컴포넌트입니다.
// 'Today's Products', 'Latest Discussions', 'IdeasGPT' 세 가지 섹션으로 구성합니다.
export default function HomePage() {
  return (
    // 전체 레이아웃을 감싸는 최상위 div입니다.
    // 좌우 여백을 'px-20' (Tailwind 기준 5rem)로 주고, 위아래 섹션 간격을 'space-y-40'으로 설정합니다.
    <div className="px-20 space-y-40">
      {/* --- Today's Products 섹션 --- */}
      <div className="grid grid-cols-3 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>

          {/* 'Explore all products' 링크 버튼 (제품 전체 보러가기) */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>

        {/* 오른쪽 두 번째, 세 번째 컬럼: ProductCard 리스트 */}
        {Array.from({ length: 11 }).map((_, index) => (
          // map 함수 내부 (_: 값은 사용하지 않고, index만 사용)
          // _ : 현재 배열 요소 (여기서는 필요 없으므로 무시)
          // index : 현재 요소의 순서 (0부터 시작하는 번호), key 설정 등에 사용
          <ProductCard
            key={index} // [중요] map 사용 시 key prop 필수
            id={`productId-${index}`} // 각 제품 카드의 고유 id
            name="Product Name" // 제품 이름
            description="Product Description" // 제품 설명
            commentsCount={12} // 댓글 수
            viewsCount={12} // 조회 수
            votesCount={120} // 투표 수
          />
        ))}
      </div>

      {/* --- Latest Discussions 섹션 --- */}
      <div className="grid grid-cols-3 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions from our community.
          </p>

          {/* 'Explore all discussions' 링크 버튼 (커뮤니티 전체 보기) */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>

        {/* 오른쪽 두 번째, 세 번째 컬럼: PostCard 리스트 */}
        {Array.from({ length: 11 }).map((_, index) => (
          // map 함수 내부 (_: 값은 사용하지 않고, index만 사용)
          // _ : 현재 배열 요소 (여기서는 필요 없음)
          // index : 현재 반복 중인 번호 (0~10), key와 id로 사용
          <PostCard
            key={`postId-${index}`} // [중요] map 사용 시 key prop 필수
            id={`postId-${index}`} // 각 게시글 카드의 고유 id
            title="What is the best productivity tool?" // 게시글 제목
            author="Jonathan" // 작성자 이름
            authorAvatarUrl="" // 작성자 아바타 URL (아직 비어 있음)
            category="Productivity" // 게시글 카테고리
            postedAt="12 hours ago" // 게시글 작성 시간
          />
        ))}
      </div>

      {/* --- IdeasGPT 섹션 --- */}
      <div className="grid grid-cols-3 gap-4">
        {/* 왼쪽 첫 번째 컬럼: 섹션 타이틀과 설명 문구 */}
        <div>
          <h2 className="text-5xl font-bold text-foreground">IdeasGPT</h2>
          <p className="text-xl font-light text-foreground">
            Find your next ideas!
          </p>

          {/* 'Explore All Ideas' 링크 버튼 (아이디어 전체 보기) */}
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore All Ideas! &rarr;</Link>
          </Button>
        </div>

        {/* 오른쪽 두 번째, 세 번째 컬럼: IdeaCard 리스트 */}
        {Array.from({ length: 5 }).map((_, index) => (
          // map 함수 내부 (_: 값은 사용하지 않고, index만 사용)
          // _ : 현재 배열 요소 (필요 없음)
          // index : 0~4 반복하며 key, id 등에 사용
          <IdeaCard
            key={`ideaId-${index}`} // key prop 설정
            id={`ideaId-${index}`} // 각 아이디어 카드 고유 id
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewsCount={123} // 조회 수
            postedAt="10 hours ago" // 게시된 시간
            likesCount={10} // 좋아요 수
            claimed={index % 2 === 0} // 인덱스가 짝수면 Claimed 처리
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
</main> */

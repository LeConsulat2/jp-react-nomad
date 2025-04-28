import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

// ==================================================
// 🌐 전체 라우터 설정
// ==================================================
export default [
  // 🏠 루트 홈 '/' 페이지

  index('common/pages/home-page.tsx'),

  // 🛍️ /products 관련 라우트 묶음

  ...prefix('products', [
    // ✅ /products 기본(index) 페이지
    index('features/products/pages/products-page.tsx'),

    // 🏆 /products/leaderboards 관련 라우트 묶음

    ...prefix('leaderboards', [
      // ✅ /products/leaderboards 기본(index) 페이지
      index('features/products/pages/leaderboard-page.tsx'),

      // ✅ /products/leaderboards/yearly/:year - 연도별 리더보드
      route(
        '/yearly/:year',
        'features/products/pages/yearly-leaderboard-page.tsx',
      ),

      // ✅ /products/leaderboards/monthly/:year/:month - 월별 리더보드
      route(
        '/monthly/:year/:month',
        'features/products/pages/monthly-leaderboard-page.tsx',
      ),

      // ✅ /products/leaderboards/daily/:year/:month/:day - 일별 리더보드
      route(
        '/daily/:year/:month/:day',
        'features/products/pages/daily-leaderboard-page.tsx',
      ),

      // ✅ /products/leaderboards/weekly/:year/:week - 주별 리더보드
      route(
        '/weekly/:year/:week',
        'features/products/pages/weekly-leaderboard-page.tsx',
      ),
    ]),

    // ----------------------
    // 📂 /products/categories 관련 라우트 묶음
    // ----------------------
    ...prefix('categories', [
      // ✅ /products/categories 기본(index) 페이지
      index('features/products/pages/categories-page.tsx'),

      // ✅ /products/categories/:category - 특정 카테고리 상세 페이지
      route('/:category', 'features/products/pages/category-page.tsx'),
    ]),

    // ----------------------
    // 🔍 /products/search 페이지
    // ----------------------
    route('/search', 'features/products/pages/search-page.tsx'),

    // ----------------------
    // ➕ /products/submit 페이지
    // ----------------------
    route('/submit', 'features/products/pages/submit-page.tsx'),

    // ----------------------
    // 📢 /products/promote 페이지
    // ----------------------
    route('/promote', 'features/products/pages/promote-page.tsx'),
  ]),
] satisfies RouteConfig;

/*
🔥 초간단 5줄 요약 (완전 기억용)
index() = "여기 디렉토리 기본 화면".

prefix() = "비슷한 URL 그룹 묶기".

route() = "URL 하나하나 추가하기".

그룹(prefix) 안에도 index() 필요. (기본화면용)

URL 경로랑 실제 파일 경로를 맞춰야 함. */

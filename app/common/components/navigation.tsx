import { Link } from 'react-router';
import { Separator } from '~/common/components/ui/separator';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

const menus = [
  {
    name: 'Products',
    to: '/products',
    items: [
      {
        name: 'Leaderboards',
        description: 'See the top performers in your community',
        to: '/products/leaderboards',
      },
      {
        name: 'Categories',
        description: 'See the top categories in your community',
        to: '/products/categories',
      },
      {
        name: 'Search',
        description: 'Search for a product',
        to: '/products/search',
      },
      {
        name: 'Submit a Product',
        description: 'Submit a product to our community',
        to: '/products/submit',
      },
      {
        name: 'Promote',
        description: 'Promote a product to our community',
        to: '/products/promote',
      },
    ],
  },
  {
    name: 'Jobs',
    to: '/jobs',
    items: [
      {
        name: 'Remote Jobs',
        description: 'Find a remote job in our community',
        to: '/jobs?location=remote',
      },
      {
        name: 'Full-Time Jobs',
        description: 'Find a full-time job in our community',
        to: '/jobs?type=full-time',
      },
      {
        name: 'Freelance Jobs',
        description: 'Find a freelance job in our community',
        to: '/jobs?type=freelance',
      },
      {
        name: 'Internships',
        description: 'Find an internship in our community',
        to: '/jobs?type=internship',
      },
      {
        name: 'Submit a Job',
        description: 'Submit a job to our community',
        to: '/jobs/submit',
      },
    ],
  },
  {
    name: 'Community',
    to: '/community',
    items: [
      {
        name: 'All Posts',
        description: 'See all posts in our community',
        to: '/community',
      },
      {
        name: 'Top Posts',
        description: 'See the top posts in our community',
        to: '/community?sort=top',
      },
      {
        name: 'New Posts',
        description: 'See the new posts in our community',
        to: '/community?sort=new',
      },
      {
        name: 'Create a Post',
        description: 'Create a post in our community',
        to: '/community/create',
      },
    ],
  },
  {
    name: 'IdeasGPT',
    to: '/ideas',
  },
  {
    name: 'Teams',
    to: '/teams',
    items: [
      {
        name: 'All Teams',
        description: 'See all teams in our community',
        to: '/teams',
      },
      {
        name: 'Create a Team',
        description: 'Create a team in our community',
        to: '/teams/create',
      },
    ],
  },
];

export default function Navigation() {
  return (
    // 상단 네비게이션 바 전체 컨테이너
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center ">
        {/* 로고 또는 홈으로 가는 링크 */}
        <Link to="/" className="font-bold tracking-tighter text-lg">
          We-Create
        </Link>

        {/* 로고와 메뉴 사이 구분선 */}
        <Separator orientation="vertical" className="h-6 mx-4" />

        {/* 네비게이션 전체 감싸는 메뉴 컴포넌트 (Radix UI의 NavigationMenu) */}
        <NavigationMenu>
          {/* 여러 메뉴 리스트(Products, Jobs 등)를 감싸는 리스트 컴포넌트 */}
          <NavigationMenuList>
            {/* 메뉴 항목 하나씩 순회 (ex. Products, Jobs, Community 등) */}
            {menus.map((menu) => (
              // 각각의 상위 메뉴 아이템 (드롭다운 열릴 메뉴)
              <NavigationMenuItem key={menu.name}>
                {/* 메뉴 제목 누르면 드롭다운 열리게 하는 트리거 버튼 */}
                <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>

                {/* 드롭다운 안의 내용들 */}
                <NavigationMenuContent>
                  {/* 드롭다운 내부 링크들 (하위 메뉴) */}
                  {menu.items?.map((item) => (
                    // 하위 메뉴 하나하나
                    <NavigationMenuItem key={item.name}>
                      <Link to={item.to}>{item.name}</Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

// NavigationMenu       ← 전체 네비게이션 시스템을 감싸는 컨테이너
//   └─ NavigationMenuList   ← 여러 개의 메뉴 항목들 모음
//         └─ NavigationMenuItem (ex. Products, Jobs, ...)
//               ├─ NavigationMenuTrigger   ← 메뉴 제목 (클릭하면 드롭다운 열림)
//               └─ NavigationMenuContent   ← 드롭다운 안에 들어가는 내용들
//                     └─ NavigationMenuItem + Link (하위 링크들)

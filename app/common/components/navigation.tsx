import { Link } from 'react-router';
import { Separator } from '~/common/components/ui/separator';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { cn } from '~/lib/utils';
import {
  BarChart3Icon,
  Divide,
  Settings2Icon,
  Settings,
  SettingsIcon,
  UserIcon,
  Book,
  BookA,
  LogOutIcon,
  BellIcon,
  MessageCircleIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
}) {
  return (
    // 상단 네비게이션 바 전체 컨테이너 (고정 위치, 흐림 효과 포함)
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        {/* 로고 또는 홈으로 가는 링크 */}
        <Link to="/" className="font-bold tracking-tighter text-lg">
          We-Create
        </Link>

        {/* 로고와 메뉴 사이 구분선 */}
        <Separator orientation="vertical" className="h-6 mx-4" />

        {/* 네비게이션 전체 감싸는 메뉴 컴포넌트 (Radix UI NavigationMenu) */}
        <NavigationMenu>
          {/* 메뉴 리스트들을 감싸는 컴포넌트 */}
          <NavigationMenuList>
            {/* 상위 메뉴 반복 렌더링 */}
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {/* 상위 메뉴 이름 버튼 (클릭 시 드롭다운 오픈) */}
                <Link to={menu.to}>
                  <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                </Link>

                {/* 드롭다운 열렸을 때 보여질 내용들 */}
                {menu.items && (
                  <NavigationMenuContent>
                    {/* 드롭다운 내부 하위 링크들 */}
                    <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                      {menu.items.map((item) => (
                        <NavigationMenuItem key={item.name}>
                          {/* 하위 메뉴 링크 감싸는 NavigationMenuLink (Radix 규칙) */}
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.to}
                              className={cn([
                                'p-3 space-y-1 block leading-none no-underline outline-none rounded-md transition-colors focus:bg-accent hover:bg-accent',
                                item.to === '/products/promote' &&
                                  'col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20',
                                item.to === '/jobs/submit' &&
                                  'col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20',
                              ])}
                            >
                              {/* 하위 메뉴 제목 */}
                              <span className="text-sm font-medium leading-relaxed">
                                {item.name}
                              </span>

                              {/* 설명 텍스트 */}
                              <p className="text-sm leading-loose text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* 로그인 여부에 따른 오른쪽 메뉴 */}
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1 size-2 bg-red-500 rounded-full"></div>
              )}
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1 size-2 bg-red-500 rounded-full"></div>
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                {/* 유저 이미지 로딩 안될 때 대체 텍스트 */}
                <AvatarFallback>No Pic</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent>...</DropdownMenuContent> */}
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col gap-2">
                <span className="font-medium">Jonathan Park</span>
                <span className="text-xs  text-muted-foreground">
                  @username
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/portfolio">
                    <BookA className="size-4 mr-2" />
                    Portfolio
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

// NavigationMenu       ← 전체 네비게이션 시스템을 감싸는 컨테이너
//   └─ NavigationMenuList   ← 여러 개의 메뉴 항목들 모음
//         └─ NavigationMenuItem (ex. Products, Jobs, ...)
//               ├─ NavigationMenuTrigger   ← 메뉴 제목 (클릭하면 드롭다운 열림)
//               └─ NavigationMenuContent   ← 드롭다운 안에 들어가는 내용들
//                     └─ NavigationMenuItem + Link (하위 링크들)

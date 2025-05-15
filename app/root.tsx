import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import Navigation from './common/components/navigation';
import { Settings } from 'luxon';

// ==================================================
// 🌐 글로벌 링크 설정 (Google Fonts 연결)
// ==================================================
export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

// ==================================================
// 🖼️ Layout 컴포넌트 (HTML 전체 레이아웃 구성)
// ==================================================
export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = 'en';
  Settings.defaultZone = 'Pacific/Auckland';
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ==================================================
// 🏡 App 컴포넌트 (메인 아웃렛 + 네비게이션)
// ==================================================
export default function App() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className={pathname.includes('/auth/') ? '' : 'py-28 px-5 lg:px-20'}>
      {pathname.includes('/auth') ? null : (
        <Navigation
          isLoggedIn={true}
          hasNotifications={true}
          hasMessages={true}
        />
      )}

      <Outlet />
    </div>
  );
}

// ==================================================
// ❗ ErrorBoundary 컴포넌트 (라우터 에러 핸들링)
// ==================================================
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

import * as Sentry from '@sentry/react-router';
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
import { makeSSRClient } from './supa-client';
import { countNotifications, getUserById } from './features/users/queries';

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

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user && user.id) {
    const profile = await getUserById(client as any, { id: user.id });
    const count = await countNotifications(client as any, { userId: user.id });
    return { user, profile, notificationsCount: 0 };
  }
  return { user: null, profile: null, notificationsCount: 0 };
};

// ==================================================
// 🏡 App 컴포넌트 (메인 아웃렛 + 네비게이션)
// ==================================================
export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isLoggedIn = loaderData.user !== null;
  return (
    <div className={pathname.includes('/auth/') ? '' : 'py-28 px-5 lg:px-20'}>
      {pathname.includes('/auth') ? null : (
        <Navigation
          isLoggedIn={isLoggedIn}
          username={loaderData.profile?.username}
          avatar={loaderData.profile?.avatar}
          name={loaderData.profile?.name}
          hasNotifications={loaderData.notificationsCount > 0}
          hasMessages={false}
        />
      )}

      <Outlet
        context={{
          isLoggedIn,
          name: loaderData.profile?.name,
          userId: loaderData.user?.id,
          username: loaderData.profile?.username,
          avatar: loaderData.profile?.avatar,
        }}
      />
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
    if (error.status !== 404) {
      Sentry.captureException(error);
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    Sentry.captureException(error);
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

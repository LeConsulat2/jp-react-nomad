import { Link, Outlet, useLocation } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '~/common/components/ui/sidebar';
import { MessageCard } from '../components/message-card';
import { HomeIcon, PackageIcon, RocketIcon, SparklesIcon } from 'lucide-react';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId, getProductsByUserId } from '../queries';
import type { Route } from './+types/dashboard-layout';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const products = await getProductsByUserId(client as any, { userId });

  return {
    userId,
    products,
  };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  return (
    <SidebarProvider className="flex  min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/my/dashbaord'}
                >
                  <Link to="/my/dashboard">
                    <HomeIcon className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/my/dashboard/ideas'}
                >
                  <Link to="/my/dashboard/ideas">
                    <SparklesIcon className="size-4" />
                    <span>Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Products Analytics</SidebarGroupLabel>
            <SidebarMenu>
              {loaderData.products.map((product) => (
                <SidebarMenuItem key={product.product_id}>
                  <SidebarMenuButton
                    asChild
                    isActive={`my/dashboard/products/${product.product_id}`}
                  >
                    <Link to={`/my/dashboard/products/${product.product_id}`}>
                      <RocketIcon className="size-4" />
                      <span>{product.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full h-full ">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

import { ChartTooltip, type ChartConfig } from '~/common/components/ui/chart';
import { ChartTooltipContent } from '~/common/components/ui/chart';
import {
  Line,
  XAxis,
  CartesianGrid,
  AreaChart,
  Area,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import type { Route } from './+types/dashboard-product-page';
import { ChartContainer } from '~/common/components/ui/chart';
import { Separator } from '~/common/components/ui/separator';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Product Dashboard | We-Create' }];
};

const chartData = [
  { month: 'January', views: 186, visitors: 237 },
  { month: 'February', views: 305, visitors: 498 },
  { month: 'March', views: 237, visitors: 309 },
  { month: 'April', views: 73, visitors: 200 },
  { month: 'May', views: 209, visitors: 220 },
  { month: 'June', views: 214, visitors: 300 },
];
const chartConfig = {
  views: {
    label: '👁️ Page Views',
    color: 'hsl(var(--chart-1))',
  },
  visitors: {
    label: '👥 Visitors',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function DashboardProductPage() {
  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          We-Create Product Dashboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitor your product performance and user engagement
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-primary">
            1,224
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-primary">
            892
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-primary">
            312
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-primary">
            4.8%
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={chartData}
                margin={{ left: 12, right: 12, top: 12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-views)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-views)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorVisitors"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-visitors)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-visitors)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis axisLine={false} tickLine={false} />
                <ChartTooltip
                  cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="var(--color-views)"
                  fill="url(#colorViews)"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  fill="url(#colorVisitors)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>📝 Added new product: "Summer Hoodie"</span>
            <span className="text-muted-foreground">2 hours ago</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span>🚀 Published campaign: "Back to School"</span>
            <span className="text-muted-foreground">5 hours ago</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span>📈 Reached 1,000 page views milestone</span>
            <span className="text-muted-foreground">1 day ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

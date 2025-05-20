import { ChartTooltip, type ChartConfig } from '~/common/components/ui/chart';
import { ChartTooltipContent } from '~/common/components/ui/chart';
import { CartesianGrid } from 'recharts';
import { XAxis } from 'recharts';
import { Line } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import type { Route } from './+types/dashboard-page';
import { ChartContainer } from '~/common/components/ui/chart';
import { LineChart } from 'recharts';
import { makeSSRClient } from '~/supa-client';
import { getLoggedInUserId } from '../queries';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Dashboard | We-Create' }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const { data, error } = await client.rpc('get_dashboard_stats', {
    user_id: userId,
  });
  if (error) {
    throw error;
  }
  return {
    chartData: data,
  };
};

const chartConfig = {
  views: {
    label: '👇',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile Views</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={loaderData.chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 12, right: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

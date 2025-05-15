import { data, redirect } from 'react-router';
import type { Route } from './+types/leaderboards-redirection-page';
import { DateTime } from 'luxon';
import { makeSSRClient } from '~/supa-client';

export function loader({ params, request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const { period } = params;
  let url: string;
  const today = DateTime.now().setZone('Pacific/Auckland').setLocale('en-nz');
  if (period === 'daily') {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === 'weekly') {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === 'monthly') {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === 'yearly') {
    url = `/products/leaderboards/yearly/${today.year}`;
  } else {
    return data(null, { status: 400, statusText: 'Invalid period' });
    // you can also do return new Response("Not Found", {status:404})
  }
  return redirect(url);
}

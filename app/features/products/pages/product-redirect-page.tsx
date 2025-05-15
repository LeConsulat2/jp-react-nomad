import { Navigate, redirect } from 'react-router';
import type { MetaFunction } from 'react-router';
import type { Route } from './+types/features/products/pages/product-redirect-page';
import { getProductById } from '../queries';
import { makeSSRClient } from '~/supa-client';

export const meta: MetaFunction = () => [
  { title: 'Product | ProductHunt Clone' },
  { name: 'description', content: 'View product details' },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const product = await getProductById(client, params.productId);
  return redirect(`/products/${params.productId}/overview`);
};

// export default function ProductRedirectPage({
//   loaderData,
// }: Route.ComponentProps) {
//   const { productId } = loaderData;

//   return <Navigate to={`/products/${productId}/overview`} replace />;
// }

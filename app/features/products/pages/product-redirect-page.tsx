import { Navigate, redirect } from 'react-router';
import type { MetaFunction } from 'react-router';
import type { Route } from './+types/features/products/pages/product-redirect-page';

export const meta: MetaFunction = () => [
  { title: 'Product | ProductHunt Clone' },
  { name: 'description', content: 'View product details' },
];

export const loader = ({ params }: Route.LoaderArgs) => {
  return redirect(`/products/${params.productId}/overview`);
};

// export default function ProductRedirectPage({
//   loaderData,
// }: Route.ComponentProps) {
//   const { productId } = loaderData;

//   return <Navigate to={`/products/${productId}/overview`} replace />;
// }

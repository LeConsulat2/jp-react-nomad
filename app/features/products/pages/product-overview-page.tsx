import { NavLink } from 'react-router';
import type { Route } from '../../../../+types/features/products/pages/product-overview-page';

export default function ProductOverviewPage({
  params: { productId },
}: Route.ComponentProps) {
  return (
    <div className="max-w-prose space-y-10">
      {/* 버튼형 네비 */}
      <div className="flex gap-2">
        <NavLink
          to={`/products/${productId}/overview`}
          className={({ isActive }) =>
            `
            text-sm px-4 py-2 rounded-lg border 
            transition shadow-sm
            ${
              isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-muted text-muted-foreground border-transparent hover:border-muted-foreground'
            }
            `
          }
        >
          Overview
        </NavLink>

        <NavLink
          to={`/products/${productId}/reviews`}
          className={({ isActive }) =>
            `
            text-sm px-4 py-2 rounded-lg border 
            transition shadow-sm
            ${
              isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-muted text-muted-foreground border-transparent hover:border-muted-foreground'
            }
            `
          }
        >
          Reviews
        </NavLink>
      </div>

      {/* 컨텐츠 */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">What is this product?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">How does it work?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    </div>
  );
}

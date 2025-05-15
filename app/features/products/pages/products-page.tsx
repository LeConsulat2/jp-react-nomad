import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/products-page';
import { getProductsByDateRange } from '../queries';
import { DateTime } from 'luxon';

import type { MetaFunction } from '@react-router/types';
import { ProductCard } from '../components/product-card';

export function meta(): MetaFunction {
  return [
    { title: 'Products | ProductHunt Clone' },
    { name: 'description', content: 'Browse all products' },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: DateTime.now().minus({ days: 30 }),
    endDate: DateTime.now(),
    limit: 20,
  });
  return {
    products,
  };
};

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="py-12 px-4 bg-black">
      <h1 className="text-5xl font-black mb-14 text-center animate-pulse">
        <span className="bg-gradient-to-r from-rose-600 via-purple-500 to-cyan-400 text-transparent bg-clip-text">
          NEXT-LEVEL PRODUCTS
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loaderData.products.map((product) => (
          <div
            key={product.product_id}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] group"
          >
            {/* Glassmorphism card effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-sm"></div>

            {/* Animated top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 animate-gradient-x"></div>

            <div className="p-6 relative z-10">
              <h2 className="text-2xl font-extrabold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                {product.name || 'Unnamed Product'}
              </h2>

              <p className="text-gray-400 mb-6 line-clamp-2 group-hover:text-gray-300">
                {product.tagline || 'No description available'}
              </p>

              <div className="flex justify-between items-center mt-8 pt-3 border-t border-gray-800">
                <div className="flex space-x-6">
                  <div className="flex items-center text-amber-500 font-bold">
                    <span className="text-xl mr-2">👑</span>
                    <span className="text-white group-hover:text-amber-400">
                      {product.upvotes || 0}
                    </span>
                  </div>

                  <div className="flex items-center text-cyan-500 font-bold">
                    <span className="text-xl mr-2">👁️</span>
                    <span className="text-white group-hover:text-cyan-400">
                      {product.views || 0}
                    </span>
                  </div>

                  <div className="flex items-center text-green-500 font-bold">
                    <span className="text-xl mr-2">💬</span>
                    <span className="text-white group-hover:text-green-400">
                      {product.reviews || 0}
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center group-hover:from-violet-500 group-hover:to-indigo-500 transform transition-all duration-300 group-hover:rotate-12">
                  <span className="text-white font-bold">→</span>
                </div>
              </div>
            </div>

            {/* Cool corner effect */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-purple-600 to-transparent rounded-full opacity-50 blur-xl group-hover:opacity-80 transition-all duration-500"></div>
          </div>
        ))}
      </div>

      {/* Add to your CSS or style tag */}
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

import type { MetaFunction } from 'react-router';
import { ProductCard } from '~/features/products/components/product-card';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | wemake' },
    { name: 'description', content: 'Welcome to wemake' },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
    </div>
  );
}

/*
<main className="min-h-[100vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-6">
  <div className="max-w-3xl text-center">
    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
      Welcome to <span className="italic">We-Create</span>
    </h1>
    <p className="text-xl sm:text-2xl font-light mb-6 leading-relaxed text-gray-300">
      Share your ideas. Build your Portfolios. Get the latest weekly AI updates
      and daily sparks from <strong className="text-white">IdeasGPT</strong>.
    </p>
    <p className="text-md sm:text-lg mb-8 text-gray-400">
      Get started by exploring our features or sign in to your account.
    </p>
    <div className="flex justify-center gap-4">
      <Button variant="default" className="text-lg px-6 py-3">
        Get Started
      </Button>
      <Button
        variant="outline"
        className="text-lg px-6 py-3 border-gray-500 text-gray-300 hover:text-white"
      >
        Learn More
      </Button>
    </div>
  </div>
</main>
*/

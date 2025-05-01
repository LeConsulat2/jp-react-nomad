import type { Route } from '../../../../+types/features/products/pages/product-reviews-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Portfolio Feedback | We-Create' },
    {
      name: 'description',
      content: 'Celebrate and support amazing portfolios',
    },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;

  return {
    productId,
    product: {
      id: productId,
      name: 'Counselling for Children & Adolescents',
      thumbnail: 'https://placehold.co/400x400?text=Portfolio+Image',
    },
    reviews: [
      {
        id: '1',
        user: {
          id: 'user1',
          name: 'Emily Watson (Counsellor)',
          avatar: 'https://placehold.co/80x80?text=E',
        },
        applauseCount: 32,
        loveCount: 18,
        helpfulness: 92,
        comment:
          'Such a warm and thoughtful portfolio. This will absolutely help so many children feel safe and supported. ❤️👏',
        createdAt: '2025-04-20T10:30:00Z',
      },
      {
        id: '2',
        user: {
          id: 'user2',
          name: 'Sophie Kim (Occupational Therapist)',
          avatar: 'https://placehold.co/80x80?text=S',
        },
        applauseCount: 25,
        loveCount: 14,
        helpfulness: 85,
        comment:
          'Lovely work! The activities look so engaging and therapeutic. I can see kids really benefiting from this.',
        createdAt: '2025-04-18T14:15:00Z',
      },
    ],
  };
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { productId, product, reviews } = loaderData;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* 상단으로 돌아가기 */}
      <div className="mb-6">
        <Link
          to={`/products/${productId}/overview`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* 타이틀 & 설명 */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        <div className="md:w-1/3">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="md:w-2/3 space-y-3">
          <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Celebrate and support the amazing work of our counsellors,
            occupational therapists, nurses, and designers helping our children
            and adolescents thrive.
          </p>
          <Link
            to={`/products/${productId}/reviews/new`}
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-pink-600 transition"
          >
            Share Your ❤️
          </Link>
        </div>
      </div>

      {/* 나무 UI */}
      <div className="relative w-full max-w-md mx-auto mb-12">
        <img
          src="https://placehold.co/300x300?text=Tree"
          alt="Tree Base"
          className="w-full h-auto"
        />
        {Array.from({ length: reviews.length }).map((_, index) => (
          <img
            key={index}
            src="https://placehold.co/24x24?text=🍃"
            alt="Leaf"
            className="absolute"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
        <p className="text-center text-muted-foreground mt-3 text-sm italic">
          Every feedback grows this hope tree 🌳
        </p>
      </div>

      {/* 카드 UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-pink-50 p-5 rounded-xl shadow hover:scale-105 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{review.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-foreground text-sm leading-relaxed mb-4">
                {review.comment}
              </p>

              <div className="flex gap-3 text-pink-500 text-sm">
                <span>👏 {review.applauseCount}</span>
                <span>❤️ {review.loveCount}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${review.helpfulness}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {review.helpfulness}% of community found this inspiring.
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No feedback yet. Be the first to celebrate this portfolio!
          </div>
        )}
      </div>
    </div>
  );
}

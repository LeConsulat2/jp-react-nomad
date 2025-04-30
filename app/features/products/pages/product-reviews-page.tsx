import type { Route } from '../../../../+types/features/products/pages/product-reviews-page';
import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Product Reviews | ProductHunt Clone' },
    { name: 'description', content: 'Read reviews for this product' },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;

  // In a real app, fetch product and reviews from an API or database
  return {
    productId,
    product: {
      id: productId,
      name: 'Sample Product',
      thumbnail: 'https://placehold.co/400',
    },
    reviews: [
      {
        id: '1',
        user: {
          id: 'user1',
          name: 'John Doe',
          avatar: 'https://placehold.co/80',
        },
        rating: 5,
        comment: 'Amazing product! It has completely transformed how I work.',
        createdAt: '2023-05-10T10:30:00Z',
      },
      {
        id: '2',
        user: {
          id: 'user2',
          name: 'Jane Smith',
          avatar: 'https://placehold.co/80',
        },
        rating: 4,
        comment:
          'Very good product overall. There are a few minor issues but the developers are responsive.',
        createdAt: '2023-05-08T14:15:00Z',
      },
    ],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { productId, product, reviews } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to={`/products/${productId}/overview`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Product
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/4">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">{product.name} - Reviews</h1>

          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="font-medium">{reviews.length} reviews</span>
            </div>

            <Link
              to={`/products/${productId}/reviews/new`}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="py-6">
              <div className="flex items-start">
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{review.user.name}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  );
}

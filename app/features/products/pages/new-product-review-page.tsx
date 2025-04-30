import { useState } from 'react';
import type { Route } from '../../../../+types/features/products/pages/new-product-review-page';
import type { MetaFunction } from 'react-router';
import { Link, Form, redirect } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Write a Review | ProductHunt Clone' },
    { name: 'description', content: 'Submit your review for this product' },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;

  // In a real app, fetch product from an API or database
  return {
    productId,
    product: {
      id: productId,
      name: 'Sample Product',
      thumbnail: 'https://placehold.co/400',
    },
  };
}

export function action({ request, params }: Route.ActionArgs) {
  const { productId } = params;

  // In a real app, process the form submission and save to database
  return redirect(`/products/${productId}/reviews`);
}

export default function NewProductReviewPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { productId, product } = loaderData;
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to={`/products/${productId}/reviews`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Reviews
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Write a Review</h1>

        <div className="flex items-center gap-4 mb-8">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-16 h-16 rounded-lg"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
        </div>

        <Form method="post" className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-3xl focus:outline-none"
                >
                  <span
                    className={`${
                      (hoveredRating || rating) >= star
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
              <input type="hidden" name="rating" value={rating} />
            </div>
            {actionData?.errors?.rating && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.rating}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={6}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Share your experience with this product..."
            />
            {actionData?.errors?.comment && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.comment}
              </p>
            )}
          </div>

          {actionData?.errors?.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {actionData.errors.general}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

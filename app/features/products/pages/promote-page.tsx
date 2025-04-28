import type { Route } from '../../../../+types/features/products/pages/promote-page';
import type { MetaFunction } from 'react-router';
import { Form } from 'react-router';

export function meta(): MetaFunction {
  return [
    { title: 'Promote Your Product | ProductHunt Clone' },
    {
      name: 'description',
      content: 'Promote your product for better visibility',
    },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    promotionPackages: [
      {
        id: 'basic',
        name: 'Basic',
        price: 49,
        features: ['Featured for 1 day', 'Priority in search results'],
      },
      {
        id: 'standard',
        name: 'Standard',
        price: 99,
        features: [
          'Featured for 3 days',
          'Priority in search results',
          'Social media promotion',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 199,
        features: [
          'Featured for 7 days',
          'Priority in search results',
          'Social media promotion',
          'Newsletter feature',
        ],
      },
    ],
  };
}

export function action({ request }: Route.ActionArgs) {
  // Handle promotion form submission
  return {
    success: false,
    errors: {
      // Add form validation logic
    },
  };
}

export default function PromotePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { promotionPackages } = loaderData;
  const errors = actionData?.errors || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Promote Your Product</h1>

      <div className="mb-10">
        <p className="text-lg">
          Get more visibility for your product by purchasing a promotion
          package.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {promotionPackages.map((pkg) => (
          <div key={pkg.id} className="border rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
            <p className="text-2xl font-bold mb-4">${pkg.price}</p>
            <ul className="mb-6 flex-grow">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                  <span className="mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
            <Form method="post">
              <input type="hidden" name="packageId" value={pkg.id} />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Select
              </button>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
}

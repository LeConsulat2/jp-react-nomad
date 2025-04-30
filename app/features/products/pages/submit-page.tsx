import { Form } from 'react-router';
import type { Route } from './+types/categories-page';
import { Hero } from '~/common/components/Hero';

export function meta(): Route.MetaFunction {
  const meta: Route.MetaFunction = () => [
    { title: 'Submit Idea | We-Create' },
    { name: 'description', content: 'Submit your idea' },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [], // Add categories fetch logic
  };
}

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <Hero
        title="Submit Your Product"
        subtitle="Showcase your idea to the We-Create community"
      />

      <Form
        method="post"
        className="mt-10 max-w-2xl mx-auto bg-card shadow-xl rounded-2xl p-8 space-y-6 border border-border"
      >
        <div className="grid gap-1">
          <label
            htmlFor="name"
            className="text-sm font-medium text-muted-foreground"
          >
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="input border bg-background border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="e.g. Productivity Pulse"
            required
          />
        </div>

        <div className="grid gap-1">
          <label
            htmlFor="category"
            className="text-sm font-medium text-muted-foreground"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="input border bg-background border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          >
            <option value="">Select a category</option>
            {/* Dynamically insert category options here */}
          </select>
        </div>

        <div className="grid gap-1">
          <label
            htmlFor="url"
            className="text-sm font-medium text-muted-foreground"
          >
            Product URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            className="input border bg-background border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="https://yourproduct.com"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-6 py-3 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
          >
            🚀 Submit Product
          </button>
        </div>
      </Form>
    </div>
  );
}

import { Form } from 'react-router';
import type { MetaFunction } from 'react-router';

interface Route {
  LoaderArgs: { request: Request };
  ActionArgs: { request: Request };
  ComponentProps: {
    loaderData: {};
    actionData: {
      success?: boolean;
      errors?: Record<string, string>;
    };
  };
  MetaFunction: MetaFunction;
}

export function loader({ request }: Route['LoaderArgs']) {
  return {};
}

export function action({ request }: Route['ActionArgs']) {
  return {};
}

export const meta: Route['MetaFunction'] = () => {
  return [
    { title: 'Submit a Job' },
    { name: 'description', content: 'Post a new job listing' },
  ];
};

export default function SubmitJobPage({
  loaderData,
  actionData,
}: Route['ComponentProps']) {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <a href="/jobs" className="text-blue-500 hover:underline">
          ← Back to jobs
        </a>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Submit a New Job</h1>

        <Form method="post" className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block font-medium">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-medium">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              className="w-full px-3 py-2 border rounded-md"
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Job
          </button>
        </Form>
      </div>
    </div>
  );
}

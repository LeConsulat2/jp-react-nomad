import { Form } from 'react-router';
import type { MetaFunction } from 'react-router';

interface Route {
  LoaderArgs: { request: Request; params: { jobId: string } };
  ActionArgs: { request: Request; params: { jobId: string } };
  ComponentProps: {
    loaderData: { jobId: string };
    actionData: {};
  };
  MetaFunction: MetaFunction;
}

export function loader({ request, params }: Route['LoaderArgs']) {
  return {
    jobId: params.jobId,
  };
}

export function action({ request, params }: Route['ActionArgs']) {
  return {};
}

export const meta: Route['MetaFunction'] = () => {
  return [
    { title: 'Job Details' },
    { name: 'description', content: 'View job details and apply' },
  ];
};

export default function JobPage({
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

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Job ID: {loaderData.jobId}</h1>

        <div className="prose max-w-none">
          {/* Job details will be rendered here */}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Apply for this position
          </h2>
          <Form method="post" className="space-y-4">
            {/* Application form will be here */}
          </Form>
        </div>
      </div>
    </div>
  );
}

import { Badge } from '~/common/components/ui/badge';
import { DotIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/job-page';
import { getJobById } from '../queries';
import { z } from 'zod';
import { DateTime } from 'luxon';
import { makeSSRClient } from '~/supa-client';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Job Details | We-Create' }];
};

const paramsSchema = z.object({
  jobId: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const { data, success } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Response('Invalid job id', { status: 400 });
  }
  const job = await getJobById(client, data.jobId);
  return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Job Details</h1>

      <div className="bg-gradient-to-tr from-primary/80 to-primary/20 h-60 w-full rounded-lg"></div>

      <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
        {/* Main Content */}
        <div className="col-span-4 space-y-10">
          {/* Profile Image + Title */}
          <div>
            <div className="size-40 bg-white rounded-full overflow-hidden relative left-10 shadow-lg">
              <img
                src={loaderData.job.company_logo}
                alt="Counselling Office"
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold">{loaderData.job.position}</h1>
            <h4 className="text-lg text-muted-foreground">
              {loaderData.job.company_name}
            </h4>
          </div>

          {/* Badges */}
          <div className="flex gap-2 capitalize">
            <Badge variant="secondary">{loaderData.job.job_type}</Badge>
            <Badge variant="secondary">{loaderData.job.location}</Badge>
          </div>

          {/* Overview */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">{loaderData.job.overview}</p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.responsibilities.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.qualifications.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.benefits.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Key Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.skills.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg shadow-md">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium capitalize">
              {loaderData.job.salary_range}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              {loaderData.job.location}
            </span>
            <span className="text-2xl font-medium">Auckland, NZ</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium capitalize">
              {loaderData.job.job_type}
            </span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              Posted{''}{' '}
              {DateTime.fromISO(loaderData.job.created_at).toRelative()}
            </span>
            <DotIcon className="size-4 mx-1" />
            <span className="text-sm text-muted-foreground">100 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}

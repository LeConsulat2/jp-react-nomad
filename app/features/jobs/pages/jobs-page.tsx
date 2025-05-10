import { data, Form, Link, useSearchParams } from 'react-router';

import { IdeaCard } from '~/features/ideas/components/idea-card';
import { Hero } from '~/common/components/Hero';
import { JobCard } from '~/features/jobs/components/job-card';
import { Button } from '~/common/components/ui/button';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from '../constants';

import type { Route } from './+types/jobs-page';
import { z } from 'zod';
import { getJobs } from '../queries';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Jobs | We-Create' },
    { name: 'description', content: 'Find the best jobs in We-Create' },
  ];
};

const searchParamsSchema = z.object({
  type: z
    .enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]])
    .optional(),
  location: z
    .enum(LOCATION_TYPES.map((type) => type.value) as [string, ...string[]])
    .optional(),
  salary: z.enum(SALARY_RANGE).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw data(
      {
        error_code: 'invalid_search_params',
        message: 'Invalid search params',
      },
      { status: 400 },
    );
  }
  const jobs = await getJobs({
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary,
  });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onFilterToggle = (key: string, value: string) => {
    const currentValue = searchParams.get(key);
    if (currentValue === value) {
      // 🌸 이미 선택된 값 클릭 → 제거
      searchParams.delete(key);
    } else {
      // 🌸 다른 값 클릭 → 값 설정
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  const onResetFilters = () => {
    searchParams.delete('type'); // 🌸 type 초기화
    searchParams.delete('location'); // 🌸 location 초기화
    searchParams.delete('salary'); // 🌸 salary 초기화
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-20">
      {/* 중앙 타이틀 */}
      <Hero title="Jobs" subtitle="Find and apply for jobs" />

      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        {/* Left: Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-3">
          {loaderData.jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              company={job.company_name}
              companyLogoUrl={job.company_logo}
              companyHq={job.company_location}
              title={job.position}
              postedAt={job.created_at}
              type={job.job_type}
              positionLocation={job.location}
              salary={job.salary_range}
            />
          ))}
        </div>

        {/* Right: Filter Sidebar (세로 정렬로 개선) */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          {/* Type */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-medium">Type</h4>
            <div className="flex gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => onFilterToggle('type', type.value)}
                  variant={
                    type.value === searchParams.get('type')
                      ? 'default'
                      : 'outline'
                  }
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-medium">Location</h4>
            <div className="flex gap-2">
              {LOCATION_TYPES.map((location) => (
                <Button
                  key={location.value}
                  onClick={() => onFilterToggle('location', location.value)}
                  variant={
                    location.value === searchParams.get('location')
                      ? 'default'
                      : 'outline'
                  }
                >
                  {location.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-medium">Salary-Range</h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGE.map((salary) => (
                <Button
                  key={salary}
                  onClick={() => onFilterToggle('salary', salary)}
                  variant={
                    salary === searchParams.get('salary')
                      ? 'default'
                      : 'outline'
                  }
                >
                  {salary}
                </Button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-start pt-4 ">
            <Button variant="destructive" onClick={onResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Form, Link, useSearchParams } from 'react-router';
import type { Route } from './+types/jobs-page';
import { IdeaCard } from '~/features/products/components/idea-card';
import { Hero } from '~/common/components/Hero';
import { JobCard } from '~/features/products/components/job-card';
import { Button } from '~/common/components/ui/button';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from '../constants';
import { cn } from '~/lib/utils';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Jobs | We-Create' },
    { name: 'description', content: 'Find and apply for jobs' },
  ];
};

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-20">
      {/* 여기가 중앙 타이틀 레이아웃 보이는곳 시작 */}
      <Hero title="Jobs" subtitle="Find and apply for jobs" />
      {/* 여기가 중앙 타이틀 레이아웃 보이는곳 끝 */}

      <div className="grid grid-cols-6 gap-4 items-start">
        {/* Left: Job cards */}
        <div className="grid grid-cols-3 col-span-4 gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <JobCard
              key={`ideaId-${index}`}
              id={`ideaId-${index}`}
              title="Nurse and Occupational Therapist powered by AI"
              company="We-Create"
              companyLogoUrl="https://via.placeholder.com/150"
              companyHq="Auckland, New Zealand"
              type="Full-time"
              positionLocation="Remote"
              salary="100,000 - 120,000"
              postedAt="12 hours ago"
            />
          ))}
        </div>

        {/* Right: Filter sidebar */}
        <div className="col-span-2 flex flex-col gap-10">
          {/* Filter: Type */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-medium">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => onFilterChange('type', type.value)}
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

          {/* Filter: Location */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-medium">Location</h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((location) => (
                <Button
                  key={location.value}
                  onClick={() => onFilterChange('location', location.value)}
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

          {/* Filter: Salary-Range */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-medium">Salary-Range</h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGE.map((salary) => (
                <Button
                  key={salary}
                  onClick={() => onFilterChange('salary', salary)}
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
        </div>
      </div>
    </div>
  );
}

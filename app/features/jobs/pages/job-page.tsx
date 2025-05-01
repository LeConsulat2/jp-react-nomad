import { Badge } from '~/common/components/ui/badge';
import type { Route } from './+types/job-page';
import { DotIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => [
  { title: 'Job Details | WeMake' },
];

export default function JobPage() {
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
                src="https://images.unsplash.com/photo-1603570426705-d4156b89f3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Counselling Office"
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold">Counsellor</h1>
            <h4 className="text-lg text-muted-foreground">
              Health New Zealand
            </h4>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            <Badge variant="secondary">Full-time</Badge>
            <Badge variant="secondary">On-site</Badge>
          </div>

          {/* Overview */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              We are seeking a compassionate and skilled Counsellor to join our
              mental health services team. You will play a pivotal role in
              providing emotional support and therapeutic interventions for our
              diverse client base.
            </p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                'Provide individual and group counselling sessions',
                'Develop treatment plans and monitor client progress',
                'Collaborate with multidisciplinary teams for holistic care',
                'Maintain accurate and confidential client records',
                'Participate in case reviews and professional development',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Bachelor's or Master's degree in Counselling or Psychology",
                'Current registration with NZAC or equivalent body',
                'Minimum 2 years clinical counselling experience',
                'Strong interpersonal and communication skills',
                'Commitment to cultural competency and inclusive practice',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                'Competitive salary and professional development allowance',
                'Paid supervision and ongoing training opportunities',
                'Wellbeing initiatives and employee assistance programme',
                'Flexible work arrangements where possible',
                'Supportive and collaborative team environment',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Key Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                'Empathy and active listening',
                'Strong ethical and professional standards',
                'Crisis management and de-escalation techniques',
                'Adaptability in a dynamic clinical environment',
                'Ability to work independently and within a team',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg shadow-md">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">$75,000 - $90,000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">Auckland, NZ</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">Full-time</span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              Posted 5 days ago
            </span>
            <DotIcon className="size-4 mx-1" />
            <span className="text-sm text-muted-foreground">247 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}

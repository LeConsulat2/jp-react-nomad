import { Form } from 'react-router';

import type { Route } from './+types/submit-job-page';
import { Hero } from '~/common/components/hero';
import InputPair from '~/common/components/ui/input-pair';
import SelectPair from '~/common/components/select-pair';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from '../constants';
import { Button } from '~/common/components/ui/button';
export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit a Job' },
    { name: 'description', content: 'Post a new job listing' },
  ];
};

export default function SubmitJobPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Submit a Job"
        subtitle="Reach out to diverse audiences of our We-Create Page!"
      />
      <Form className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-3 gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(예: Occupational Therapist – Youth Services)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="Occupational Therapist – Youth Services"
            textArea
          />
          <InputPair
            id="overview"
            label="Overview"
            description="Brief summary of the role (max 1000 characters)"
            name="overview"
            maxLength={1000}
            type="text"
            required
            placeholder="Provide occupational therapy for adolescents aged 12–24, supporting functional independence and wellbeing."
            textArea
          />
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="Key duties of the role (max 1000 characters)"
            name="responsibilities"
            maxLength={1000}
            type="text"
            required
            placeholder="Assess functional needs of adolescents (12–24), develop treatment plans, deliver interventions, collaborate with families and youth services."
            textArea
          />
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="Required qualifications and certifications (max 1000 characters)"
            name="qualifications"
            maxLength={1000}
            type="text"
            required
            placeholder="Bachelor's or Master's degree in Occupational Therapy, current NZOT registration, experience working with youth (12–24)."
            textArea
          />
          <InputPair
            id="benefits"
            label="Benefits"
            description="Perks and benefits (max 1000 characters)"
            name="benefits"
            maxLength={1000}
            type="text"
            required
            placeholder="Paid supervision, professional development budget, flexible hours, supportive multidisciplinary team."
            textArea
          />
          <InputPair
            id="skills"
            label="Skills"
            description="Key skills required (max 1000 characters)"
            name="skills"
            maxLength={1000}
            type="text"
            required
            placeholder="Empathy, youth engagement, cultural competency, strong communication, therapeutic creativity."
            textArea
          />
          <InputPair
            id="companyName"
            label="Company Name"
            description="Organization offering the role"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="Health New Zealand"
          />
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="Link to your company logo (optional)"
            name="companyLogoUrl"
            type="url"
            required
            placeholder="https://example.com/logo.png"
          />
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="Location of the role"
            name="companyLocation"
            type="text"
            required
            placeholder="Auckland, New Zealand"
          />
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="Link to the application page"
            name="applyUrl"
            type="url"
            required
            placeholder="https://example.com/apply"
          />
          <SelectPair
            label="Job type"
            description="Select the type"
            name="Job type"
            required
            placeholder="Select the type"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="Job Location"
            description="Select the location"
            name="Job location"
            required
            placeholder="Select the location"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          <SelectPair
            label="Salary Range"
            description="Select the salary range"
            name="Salary range"
            required
            placeholder="Select the salary range"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
          <Button type="submit" className="w-full max-w-full">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

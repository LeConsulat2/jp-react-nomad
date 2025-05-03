import { Form } from 'react-router';
import { Hero } from '~/common/components/Hero';
import { Button } from '~/common/components/ui/button';
import InputPair from '~/common/components/ui/input-pair';
import type { Route } from './+types/submit-team-page';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Create Team | wemake' }];
};

export default function SubmitTeamPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create a Team"
        subtitle="Form a team to showcase your projects and collaborate with others"
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          label="Team Name"
          name="name"
          id="name"
          description="(40 characters or less)"
          required
          placeholder="i.e Team Alpha"
        />
        <InputPair
          label="Description"
          name="description"
          id="description"
          description="(100 characters or less)"
          required
          placeholder="i.e A team of developers building innovative tools"
        />
        <InputPair
          label="About"
          name="about"
          id="about"
          description="(1000 characters or less)"
          required
          placeholder="Tell us about your team, your mission, and what you're working on"
          textArea
        />
        <InputPair
          label="Website"
          name="website"
          id="website"
          description="Your team's website URL"
          placeholder="https://yourteam.com"
        />
        <InputPair
          label="Twitter"
          name="twitter"
          id="twitter"
          description="Your team's Twitter handle"
          placeholder="@yourteam"
        />
        <Button className="mx-auto">Create Team</Button>
      </Form>
    </div>
  );
}

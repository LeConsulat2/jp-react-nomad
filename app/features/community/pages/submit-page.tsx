import type { Route } from '~/+types/community';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Post | Community' },
    { name: 'description', content: 'Create a new post in the community' },
  ];
};

export default function SubmitPage() {
  return <div>SubmitPage</div>;
}

import { Form } from 'react-router';
import type { Route } from './+types/categories-page';
import { Hero } from '~/common/components/Hero';
import InputPair from '~/common/components/ui/input-pair';
import SelectPair from '~/common/components/select-pair';

export function meta(): Route.MetaFunction {
  const meta: Route.MetaFunction = () => [
    { title: 'Submit Idea | We-Create' },
    { name: 'description', content: 'Submit your idea' },
  ];
}

export default function SubmitPage() {
  return (
    <div>
      <Hero title="Submit your ideas or Portfolios" />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-2xl mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="Fill in your details"
            id="name"
            name="name"
            type="text"
            required
            placeholder="Name of your context"
          />
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your product"
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: 'AI', value: 'ai' },
              { label: 'Counselling', value: 'counselling' },
              { label: 'Marketing', value: 'marketing' },
              { label: 'Development', value: 'development' },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}

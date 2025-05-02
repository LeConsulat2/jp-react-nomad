import { Form } from 'react-router';
import { Button } from '~/common/components/ui/button';
import type { Route } from '../../../common/+types/route-types';
import { Link } from 'react-router';
import InputPair from '~/common/components/ui/input-pair';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Start OTP | OTP Authentication' }];
};

export default function OtpStartPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Log in with One-Time Password
          </h1>
          <p>We will send you a 4-digit code to log in to your account.</p>
        </div>
        <Form className="w-full space-y-4">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wecreate@example.com"
          />

          <Button className="w-full" type="submit">
            Send One-Time Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

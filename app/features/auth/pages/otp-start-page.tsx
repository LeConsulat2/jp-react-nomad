import { Form, redirect, useNavigation } from 'react-router';
import { Button } from '~/common/components/ui/button';

import { Link } from 'react-router';
import InputPair from '~/common/components/ui/input-pair';
import type { Route } from './+types/otp-start-page';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';
import { LoaderCircle } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Start OTP | OTP Authentication' }];
};

const formSchema = z.object({
  email: z.string().email(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { data, success } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { error: 'Invalid email' };
  }
  const { email } = data;
  const { client } = makeSSRClient(request);

  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) {
    return { error: error.message };
  }

  return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    actionData && 'isSubmitting' in actionData
      ? actionData.isSubmitting
      : navigation.state === 'submitting';
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Log in with One-Time Password
          </h1>
          <p>We will send you a 6-digit code to log in to your account.</p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wecreate@example.com"
          />
          {actionData && 'error' in actionData && (
            <p className="text-red-500">{actionData.error}</p>
          )}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Send One-Time Password'
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

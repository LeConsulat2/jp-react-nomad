import { Form, redirect, useNavigation, useSearchParams } from 'react-router';
import type { Route } from './+types/otp-complete-page';
import InputPair from '~/common/components/ui/input-pair';
import { Button } from '~/common/components/ui/button';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';
import { LoaderCircle } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Verify OTP - ProductHunt Clone' }];
};

const formSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { email, otp } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: 'email',
  });
  if (verifyError) {
    return { error: verifyError.message };
  }
  return redirect('/', { headers });
};

export default function OtpPage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigation = useNavigation();
  const isSubmitting =
    actionData && 'isSubmitting' in actionData
      ? actionData.isSubmitting
      : navigation.state === 'submitting';

  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Verify One-Time Password</h1>
          <p>Enter the OTP code from your email</p>
        </div>

        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            defaultValue={email || ''}
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors?.email?.join(', ')}
            </p>
          )}

          <InputPair
            label="OTP Code"
            description="Enter the OTP code from your email"
            name="otp"
            id="otp"
            required
            type="text"
            placeholder="6-digit code"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.otp?.join(', ')}
            </p>
          )}
          {actionData && 'verifyError' in actionData && (
            <p className="text-sm text-red-500">{actionData.verifyError}</p>
          )}

          <Button type="submit" className="w-full">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Verify One-Time Password'
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

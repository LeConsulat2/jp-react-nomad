import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/login-page';
import { Form, Link, redirect, useNavigation } from 'react-router';
import InputPair from '~/common/components/ui/input-pair';
import AuthButtons from '../components/auth-buttons';
import { makeSSRClient } from '~/supa-client';
import { z } from 'zod';
import { checkUsernameExists } from '../queries';
import { LoaderCircle } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Login | We-Create' }];
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const usernameExists = await checkUsernameExists(request, data.username);
  if (usernameExists) {
    return { formErrors: { username: ['Username already exists'] } };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { name: data.name, username: data.username },
    },
  });
  if (signUpError) {
    return {
      signUpError: signUpError.message,
    };
  }
  return redirect('/', { headers });
};

const formSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={'ghost'} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/login">Log in</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="name"
            label="Name"
            description="Enter your name"
            name="name"
            required
          />
          {actionData && 'signUpError' in actionData && (
            <p className="text-red-500">{actionData?.formErrors?.name?.[0]}</p>
          )}
          <InputPair
            id="username"
            label="Username"
            description="Enter your username"
            name="username"
            required
          />
          {actionData && 'formErrors' in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.username?.[0]}
            </p>
          )}
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && 'signUpError' in actionData && (
            <p className="text-red-500">{actionData?.formErrors?.email?.[0]}</p>
          )}
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="i.e wemake@example.com"
          />
          {actionData && 'signUpError' in actionData && (
            <p className="text-red-500">
              {actionData?.formErrors?.password?.[0]}
            </p>
          )}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Create an account'
            )}
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}

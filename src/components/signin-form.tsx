'use client';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { Spinner } from './ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const signInFormSchema = z.object({
  email: z.email({ message: 'Invalid email adress' }),
  password: z.string().min(8, { message: 'Password required' }),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,

          callbackURL: '/',
        },
        {
          onSuccess: () => {
            router.push('/dashboard');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Login in your account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='enter your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='cursor-pointer'
              disabled={isLoading}
            >
              {isLoading ? <Spinner className='size-6' /> : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

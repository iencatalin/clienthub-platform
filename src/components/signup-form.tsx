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

const signUpFormSchema = z
  .object({
    email: z.email({ message: 'Invalid email adress' }),
    password: z.string().min(8, { message: 'Password required' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords dont`t match',
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      setIsLoading(true);
      await authClient.signUp.email(
        {
          name: values.email,
          email: values.email,
          password: values.password,

          callbackURL: '/dashboard',
        },
        {
          onSuccess: () => {
            router.push('/');
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
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
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
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='confirm your password' {...field} />
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
              {isLoading ? <Spinner className='size-6' /> : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

'use client';

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
import Link from 'next/link';
import { signInSchema, type SignInFormValues } from '@/lib/validators/sign-in';
import { ArrowRight, EyeIcon, EyeOffIcon } from 'lucide-react';

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
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
    <div className='space-y-4'>
      <h2 className='text-3xl font-bold'>
        Welcome back <span>👋</span>
      </h2>
      <p className='text-slate-700/90 text-sm tracking-wider'>
        Sign in to your workspace to continue
      </p>
      <Form {...form}>
        <form
          className='flex flex-col gap-6 pt-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-slate-700/90 text-sm'>
                  Email address
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    className='bg-slate-100/80 ring-1 ring-slate-300/80 w-full'
                    placeholder='Enter your email address'
                    {...field}
                  />
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
                <div className='flex items-center justify-between'>
                  <FormLabel className='text-slate-700/90 text-sm'>
                    Password
                  </FormLabel>
                  <Link
                    href='/forgot-password'
                    className='text-sm text-blue-600 hover:underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <div className='relative'>
                    <Input
                      className='bg-slate-100/80 ring-1 ring-slate-300/80 '
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your password'
                      {...field}
                    />

                    <button
                      type='button'
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className='size-4' />
                      ) : (
                        <EyeIcon className='size-4' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size='lg'
            type='submit'
            className='cursor-pointer text-base bg-linear-to-r from-blue-600 to-purple-500 hover:bg-linear-to-r hover:from-blue-700 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? <Spinner className='size-6' /> : 'Sign In'}
          </Button>
        </form>
      </Form>
      <div className='flex justify-center items-center gap-2 text-sm text-slate-600'>
        Don&#39;t have an account?
        <Link
          href='/sign-up'
          className='flex items-center gap-2 text-blue-600 font-semibold'
        >
          Create one free <ArrowRight className='size-4' />
        </Link>
      </div>
    </div>
  );
}

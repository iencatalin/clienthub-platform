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
import { ArrowRight, EyeIcon, EyeOffIcon, Sparkles } from 'lucide-react';

const DEMO_EMAIL = 'demo@revelio.dev';
const DEMO_PASSWORD = 'Demo!1234';

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
    setIsLoading(true);

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.replace('/dashboard');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message ?? 'Invalid credentials');
          setIsLoading(false);
        },
      },
    );
  };

  const handleTryDemo = () => {
    form.setValue('email', DEMO_EMAIL);
    form.setValue('password', DEMO_PASSWORD);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-3xl font-bold'>
        Welcome back <span>👋</span>
      </h2>

      <p className='text-slate-700/90 text-sm tracking-wider'>
        Sign in to your workspace to continue
      </p>

      <Button
        type='button'
        variant='outline'
        className='w-full gap-2 border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-50'
        onClick={handleTryDemo}
        disabled={isLoading}
      >
        <Sparkles className='size-4' />
        Try Demo
      </Button>

      <div className='relative py-1'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-slate-200' />
        </div>

        <div className='relative flex justify-center text-xs'>
          <span>or sign in manually</span>
        </div>
      </div>

      <Form {...form}>
        <form
          className='flex flex-col gap-6 pt-2'
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
                    className='w-full bg-slate-100/80 ring-1 ring-slate-300/80'
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
                <FormLabel className='text-slate-700/90 text-sm'>
                  Password
                </FormLabel>

                <FormControl>
                  <div className='relative'>
                    <Input
                      className='bg-slate-100/80 pr-10 ring-1 ring-slate-300/80'
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
            className='cursor-pointer bg-linear-to-r from-blue-600 to-purple-500 text-base hover:bg-linear-to-r hover:from-blue-700 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? <Spinner className='size-6' /> : 'Sign In'}
          </Button>
        </form>
      </Form>

      <div className='flex items-center justify-center gap-2 text-sm text-slate-600'>
        Don&#39;t have an account?
        <Link
          href='/sign-up'
          className='flex items-center gap-2 font-semibold text-blue-600'
        >
          Create one free
          <ArrowRight className='size-4' />
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUpSchema, type SignUpFormValues } from '@/lib/validators/sign-up';
import { signUpAction } from '@/app/actions/sign-up';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import { ArrowRight, EyeIcon, EyeOffIcon } from 'lucide-react';
import PasswordStrength from './password-strength';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
      organizationType: 'INDIVIDUAL',
      cui: '',
      regCom: '',
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);

    const result = await signUpAction(values);

    if (result?.error) {
      form.setError('root', {
        message: result.error,
      });
      setIsLoading(false);
      return;
    }
  };

  const organizationType = useWatch({
    control: form.control,
    name: 'organizationType',
  });

  return (
    <div className='space-y-4'>
      <h2 className='text-3xl font-bold'>Create your account</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6 pt-8'
        >
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-slate-700/90 text-sm'>
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      className='bg-slate-100/80 ring-1 ring-slate-300/80'
                      placeholder='Your name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='organizationName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-slate-700/90 text-sm'>
                    Organization
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      className='bg-slate-100/80 ring-1 ring-slate-300/80 w-full'
                      placeholder='Organization name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='organizationType'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-slate-700/90 text-sm'>
                  Organization Type
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='w-full flex justify-between'
                  >
                    <FieldLabel htmlFor='individual'>
                      <Field
                        orientation='horizontal'
                        className='bg-slate-100/80 ring-1 ring-slate-300/80 rounded-md'
                      >
                        <FieldContent>
                          <FieldTitle>Individual / PFA</FieldTitle>
                          <FieldDescription>
                            For individuals and freelancher
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value='INDIVIDUAL' id='individual' />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor='company'>
                      <Field
                        className='bg-slate-100/80 ring-1 ring-slate-300/80 overflow-hidden rounded-md'
                        orientation='horizontal'
                      >
                        <FieldContent>
                          <FieldTitle>Company / SRL</FieldTitle>
                          <FieldDescription>
                            Registered legal entity
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value='COMPANY' id='company' />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {organizationType === 'COMPANY' && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <FormField
                control={form.control}
                name='cui'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-700/90 text-sm'>
                      CUI / Tax ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='bg-slate-100/80 ring-1 ring-slate-300/80 w-full'
                        placeholder='RO12345678'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='regCom'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-700/90 text-sm'>
                      Reg. Com.
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='bg-slate-100/80 ring-1 ring-slate-300/80 w-full'
                        placeholder='J40/1234/2020'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-slate-700/90 text-sm'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    className='bg-slate-100/80 ring-1 ring-slate-300/80'
                    placeholder='Enter your email'
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
                <PasswordStrength password={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-slate-700/90 text-sm'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      className='bg-slate-100/80 ring-1 ring-slate-300/80 '
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm your password'
                      {...field}
                    />

                    <button
                      type='button'
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
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

          <FormItem className='flex items-center gap-2'>
            <Checkbox
              id='terms-checkbox'
              name='terms-checkbox'
              className='bg-slate-100/80 ring-1 ring-slate-300/80'
            />
            <FormLabel
              htmlFor='terms-checkbox'
              className='text-slate-700/90 text-sm flex items-center gap-1'
            >
              I agree to the Terms of Service and Privacy Policy
            </FormLabel>
          </FormItem>

          {form.formState.errors.root && (
            <p className='text-sm text-red-500'>
              {form.formState.errors.root.message}
            </p>
          )}

          <Button
            className='cursor-pointer text-base bg-linear-to-r from-blue-600 to-purple-500 hover:bg-linear-to-r hover:from-blue-700 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Spinner className='size-6' /> : 'Create Account'}
          </Button>
        </form>
      </Form>
      <div className='flex justify-center items-center gap-2 text-sm text-slate-600 pt-2'>
        Already have an account?
        <Link
          href='/sign-in'
          className='flex items-center gap-2 text-blue-600 font-semibold'
        >
          Sign in <ArrowRight className='size-4' />
        </Link>
      </div>
    </div>
  );
}

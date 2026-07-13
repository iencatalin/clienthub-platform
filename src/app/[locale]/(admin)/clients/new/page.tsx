'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  CreateContactFormValues,
  createContactSchema,
} from '@/lib/validators/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContactAction } from '@/app/actions/contacts';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewClient() {
  const form = useForm<CreateContactFormValues>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  const onSubmit = async (values: CreateContactFormValues) => {
    const result = await createContactAction(values);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    if (result?.contactId) {
      toast.success('Contact created!');
      router.push('/clients');
    }
  };

  return (
    <div className='mt-4'>
      <div className='flex items-center gap-4 border-slate-300/90 border-b pb-4'>
        <div className='bg-purple-200/90 border border-purple-600 rounded-md p-1'>
          <Plus className='size-8 text-purple-600' />
        </div>
        <div>
          <h2 className='text-2xl font-semibold text-slate-900'>New Client</h2>
          <p className='text-slate-500/90 text-sm'>Create a new client</p>
        </div>
      </div>

      <Card className='mt-4 max-w-2xl'>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-slate-800/90'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full bg-slate-200/50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
                        placeholder='Name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-slate-800/90'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full bg-slate-200/50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
                        placeholder='Your email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-slate-800/90'>
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='w-full bg-slate-200/50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
                        placeholder='Your phone number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center gap-3'>
                <Button
                  className='bg-slate-50 text-slate-900 ring ring-slate-300/90 hover:bg-slate-100/90'
                  type='button'
                  variant='outline'
                  disabled={isSubmitting}
                  onClick={() => router.back()}
                >
                  Close
                </Button>
                <Button
                  className='bg-linear-to-r from-blue-600 to-purple-500 px-8 text-base'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

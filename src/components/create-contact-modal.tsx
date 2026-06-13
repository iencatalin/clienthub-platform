'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import {
  CreateContactFormValues,
  createContactSchema,
} from '@/lib/validators/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContactAction } from '@/app/actions/contacts';
import { toast } from 'sonner';

type Props = {
  onClose: () => void;
  onCreated: (contactId: string) => void;
};

export function CreateContactModal({ onClose, onCreated }: Props) {
  const form = useForm<CreateContactFormValues>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (values: CreateContactFormValues) => {
    const result = await createContactAction(values);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    if (result?.contactId) {
      toast.success('Contact created!');
      onCreated(result.contactId);
    }
  };
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Contact</DialogTitle>
        </DialogHeader>
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
                </FormItem>
              )}
            />{' '}
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
                </FormItem>
              )}
            />
            <div className='flex items-center gap-3'>
              <Button
                className='bg-slate-50 text-slate-900 ring ring-slate-300/90 hover:bg-slate-100/90'
                type='button'
                variant='outline'
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                className='bg-linear-to-r from-blue-600 to-purple-500 px-8 text-base'
                type='submit'
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

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
      form.setError('root', { message: result.error });
      return;
    }

    if (result?.contactId) {
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Your email' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder='Your phone number' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Button variant='outline' type='button' onClick={onClose}>
                close
              </Button>
              <Button>Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

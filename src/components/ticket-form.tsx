'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import {
  createTicketManualSchema,
  type CreateTicketFormValues,
} from '@/lib/validators/ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ContactCombobox } from './contact-combobox';
import { useState } from 'react';
import { CreateContactModal } from './create-contact-modal';

import { Contact } from '@/types';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

type Props = {
  contacts: Contact[];
};

export default function TicketForm({ contacts }: Props) {
  const [showContactModal, setShowContactModal] = useState(false);

  const form = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketManualSchema),
    defaultValues: {
      source: 'WEB',
      priority: 'MEDIUM',
      subject: '',
      assignedToId: undefined,
      internalNotes: '',
    },
  });
  return (
    <>
      <Form {...form}>
        <form className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='contactId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg text-shadow-slate-950'>
                  Contact
                </FormLabel>
                <FormControl>
                  <ContactCombobox
                    contacts={contacts}
                    value={field.value}
                    onChange={field.onChange}
                    onCreateContact={() => setShowContactModal(true)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='subject'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg text-slate-900 pt-2'>
                  Subject
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Enter the ticket subject...'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex items-center justify-start gap-5 pt-2'>
            <FormField
              control={form.control}
              name='source'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Source' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='WEB'>Web</SelectItem>
                      <SelectItem value='PHONE'>Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select priority' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='LOW'>Low</SelectItem>
                      <SelectItem value='MEDIUM'>Medium</SelectItem>
                      <SelectItem value='HIGH'>High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='internalNotes'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-normal text-lg text-slate-950'>
                  Notes
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Add any additional notes...'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />
          <div className='flex items-center justify-end gap-4'>
            <button>Cancel</button>
            <Button>Save</Button>
          </div>
        </form>
      </Form>
      {showContactModal && (
        <CreateContactModal
          onClose={() => setShowContactModal(false)}
          onCreated={(contactId) => {
            form.setValue('contactId', contactId);
            setShowContactModal(false);
          }}
        />
      )}
    </>
  );
}

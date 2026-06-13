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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { createTicketAction } from '@/app/actions/tickets';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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

  const onSubmit = async (values: CreateTicketFormValues) => {
    const result = await createTicketAction(values);
    if (result?.error) {
      toast.error(result.error);
      return;
    }
    toast.success('Ticket created!');
  };

  const router = useRouter();
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='gap-4'>
            <CardHeader className='px-4'>
              <CardTitle className='text-base font-semibold'>Contact</CardTitle>
              <CardDescription className='text-xs text-slate-500/90'>
                Who is this ticket for?
              </CardDescription>
            </CardHeader>
            <Separator className='text-slate-500/90' />
            <CardContent>
              <FormField
                control={form.control}
                name='contactId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-slate-800/90'>
                      Select Contact <span className='text-red-500'>*</span>
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
            </CardContent>
          </Card>
          <Card className='mt-4 gap-4 pb-0'>
            <CardHeader className='px-4'>
              <CardTitle className='text-base font-semibold'>
                Ticket details
              </CardTitle>
              <CardDescription className='text-xs text-slate-500/90'>
                Fill in the information about this ticket
              </CardDescription>
            </CardHeader>
            <Separator className='text-slate-500/90' />
            <CardContent>
              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-slate-800/90'>
                      Subject <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='w-full bg-slate-200/50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
                        placeholder='Describe the client`s request briefly...'
                      />
                    </FormControl>
                    <p className='text-xs text-slate-500/90'>
                      Be specific — this helps your team understand the request
                      at a glance
                    </p>
                  </FormItem>
                )}
              />
              <div className='flex gap-5 pt-2'>
                <FormField
                  control={form.control}
                  name='source'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-xs font-medium text-slate-800/90'>
                        Source
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full bg-slate-200/50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'>
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
                    <FormItem className='flex-1'>
                      <FormLabel className='text-xs font-medium text-slate-800/90'>
                        Priority
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full bg-slate-200/50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'>
                            <SelectValue placeholder='Select priority' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='LOW'>Low</SelectItem>
                          <SelectItem value='MEDIUM'>Medium</SelectItem>
                          <SelectItem value='HIGH'>High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='internalNotes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-slate-800/90'>
                      Internal notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='w-full justify-between bg-slate-200/50 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
                        placeholder='Add any additional notes...'
                      />
                    </FormControl>
                    <p className='text-xs text-slate-500/90'>
                      Not visible to the client
                    </p>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex justify-between items-center bg-slate-200/50 py-4 border border-t-slate-200'>
              <p className='text-xs text-slate-500/90'>
                <span className='text-red-500'>*</span>Required fields
              </p>
              <div className='flex items-center gap-3'>
                <Button
                  className='bg-slate-50 text-slate-900 ring ring-slate-300/90 hover:bg-slate-100/90'
                  type='button'
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  className='bg-linear-to-r from-blue-600 to-purple-500 px-8 text-base hover:-translate-y-px duration-200 transition'
                  type='submit'
                >
                  Create Ticket
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {showContactModal && (
        <CreateContactModal
          onClose={() => setShowContactModal(false)}
          onCreated={(contactId) => {
            form.setValue('contactId', contactId);
            router.refresh();
            setShowContactModal(false);
          }}
        />
      )}
    </>
  );
}

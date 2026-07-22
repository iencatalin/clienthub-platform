'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { simulateMessageAction } from '@/app/actions/simulate-messages';

const schema = z
  .object({
    source: z.enum(['WHATSAPP', 'EMAIL']),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    message: z.string().min(1, 'Message is required'),
  })
  .refine((data) => data.phone || data.email, {
    message: 'Phone or email is required',
    path: ['phone'],
  });

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SimulateMessageForm({ open, onClose }: Props) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      source: 'WHATSAPP',
      phone: '',
      email: '',
      message: '',
    },
  });

  const source = form.watch('source');

  const onSubmit = async (values: FormValues) => {
    const result = await simulateMessageAction(values);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Message simulated! Ticket created.');
    form.reset();
    onClose();
    router.push(`/tickets/${result.ticketId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simulate incoming message</DialogTitle>
          <DialogDescription>
            This simulates a real WhatsApp or Email message coming in. A contact
            and ticket will be created automatically.
          </DialogDescription>
        </DialogHeader>

        <div className='bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700'>
          Demo mode — no real WhatsApp or Email needed.
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
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
                      <SelectTrigger className='bg-slate-50'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='WHATSAPP'>WhatsApp</SelectItem>
                      <SelectItem value='EMAIL'>Email</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {source === 'WHATSAPP' ? (
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-slate-50'
                        placeholder='+40722111222'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        className='bg-slate-50'
                        placeholder='client@firma.ro'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className='bg-slate-50'
                      placeholder='Bună ziua, am nevoie de...'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3'>
              <Button type='button' variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={form.formState.isSubmitting}
                className='bg-green-600 hover:bg-green-700 text-white'
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

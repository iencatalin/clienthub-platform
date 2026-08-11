'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { simulateMessageAction } from '@/app/actions/simulate-messages';
import {
  CreateSimulateMessageFormValues,
  createSimulateMessageSchema,
} from '@/lib/validators/simulate-message';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SimulateMessageForm({ open, onClose }: Props) {
  const router = useRouter();
  const form = useForm<CreateSimulateMessageFormValues>({
    resolver: zodResolver(createSimulateMessageSchema),
    defaultValues: {
      source: 'WHATSAPP',
      name: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: CreateSimulateMessageFormValues) => {
    const result = await simulateMessageAction({
      ...values,
      source: 'WHATSAPP',
    });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Message simulated! Ticket created.');
    router.push(`/tickets/${result.ticketId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simulate incoming message</DialogTitle>
          <DialogDescription>
            This simulates an incoming WhatsApp message. A customer, contact,
            and ticket will be created automatically.
          </DialogDescription>
        </DialogHeader>

        <div className='bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700'>
          Demo environment — simulate incoming WhatsApp messages without
          connecting a real WhatsApp Business account.
        </div>

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
                  <FormLabel>Customer name</FormLabel>{' '}
                  <FormControl>
                    <Input
                      className='bg-slate-50'
                      placeholder='Ion Popescu'
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

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className='bg-slate-50'
                      placeholder='Message...'
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

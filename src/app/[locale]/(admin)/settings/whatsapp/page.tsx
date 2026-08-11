import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';

import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { SimulateMessageBtn } from '@/components/simulate-message-btn';

export default async function WhatsAppSettingsPage() {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      organizationId: true,
    },
  });

  if (!orgUser) {
    return (
      <div className='flex min-h-100 items-center justify-center'>
        <p className='text-sm text-muted-foreground'>Organization not found.</p>
      </div>
    );
  }

  return (
    <div className='space-y-8 py-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-slate-950'>
          WhatsApp
        </h1>

        <p className='mt-2 max-w-2xl text-sm text-muted-foreground'>
          Connect your business WhatsApp numbers and manage customer
          conversations directly from your inbox.
        </p>
      </div>

      <Card className='overflow-hidden'>
        <CardHeader className='border-b bg-slate-50/70'>
          <div className='flex items-start gap-4'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-100'>
              <MessageSquare className='size-5 text-green-600' />
            </div>

            <div>
              <CardTitle>Connect WhatsApp Business</CardTitle>

              <CardDescription className='mt-1 max-w-xl'>
                Connect a WhatsApp Business number to receive customer messages
                and reply directly from your support inbox.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-6'>
          <div className='grid gap-6 md:grid-cols-3'>
            <div className='flex gap-3'>
              <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-green-600' />

              <div>
                <p className='text-sm font-medium'>Centralized inbox</p>

                <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                  Keep customer conversations organized in one place.
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-green-600' />

              <div>
                <p className='text-sm font-medium'>Team collaboration</p>

                <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                  Let your team handle WhatsApp conversations together.
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <ShieldCheck className='mt-0.5 size-5 shrink-0 text-green-600' />

              <div>
                <p className='text-sm font-medium'>Business messaging</p>

                <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                  Keep messages connected to customers and support tickets.
                </p>
              </div>
            </div>
          </div>

          <Separator className='my-6' />

          <div className='flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm font-medium'>
                WhatsApp Business connection
              </p>

              <p className='mt-1 text-xs text-muted-foreground'>
                Real WhatsApp integration is not connected in this demo
                environment.
              </p>
            </div>

            <Button disabled>
              Connect WhatsApp
              <ArrowRight className='ml-2 size-4' />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className='border-dashed border-indigo-200 bg-indigo-50/30'>
        <CardHeader>
          <div className='flex items-start gap-4'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100'>
              <MessageSquare className='size-5 text-indigo-600' />
            </div>

            <div>
              <CardTitle className='text-base'>Demo environment</CardTitle>

              <CardDescription className='mt-1'>
                Test the WhatsApp customer support flow without connecting a
                real WhatsApp Business account.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col gap-4 rounded-lg border border-indigo-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-900'>
                Simulate an incoming message
              </p>

              <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                Create a customer conversation and ticket as if a message was
                received through WhatsApp.
              </p>
            </div>

            <SimulateMessageBtn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import TicketPriorityBadge from '@/components/ticket/ticket-priority-badge';
import TicketSourceBadge from '@/components/ticket/ticket-source-badge';
import TicketStatusBadge from '@/components/ticket/ticket-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requirePermission } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';
import Conversation from '@/components/ticket/conversation';
import {
  TicketActions,
  TicketPrioritySelect,
  TicketStatusSelect,
} from '@/components/ticket/ticket-actions';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TicketPage({ params }: Props) {
  const { id } = await params;
  const { orgUser } = await requirePermission('tickets:read');

  const ticket = await prisma.ticket.findFirst({
    where: {
      id,
      organizationId: orgUser.organizationId,
    },
    include: {
      contact: true,
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  if (!ticket) {
    notFound();
  }

  return (
    <div className='space-y-6 py-4 md:py-6'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-3'>
          <p className='text-sm text-muted-foreground'>
            Ticket #{ticket.ticketNumber}
          </p>

          <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
            <div className='min-w-0'>
              <h1 className='text-xl font-bold tracking-tight text-slate-950 sm:text-2xl'>
                {ticket.subject}
              </h1>

              <div className='mt-3 flex flex-wrap items-center gap-2'>
                <TicketStatusBadge status={ticket.status} />
                <TicketPriorityBadge priority={ticket.priority} />
                <TicketSourceBadge source={ticket.source} />

                <span className='text-sm text-muted-foreground'>
                  {ticket.contact.name}
                </span>

                <span className='hidden text-muted-foreground sm:inline'>
                  •
                </span>

                <time
                  dateTime={ticket.createdAt.toISOString()}
                  className='text-sm text-muted-foreground'
                >
                  {ticket.createdAt.toLocaleDateString('ro-RO', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <div className='w-full md:w-auto'>
              <TicketActions
                ticketId={ticket.id}
                status={ticket.status}
                priority={ticket.priority}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <Card className='min-w-0 md:col-span-3'>
          <CardHeader className='border-b px-4 py-4 sm:px-6'>
            <CardTitle className='text-base sm:text-lg'>Messages</CardTitle>
          </CardHeader>

          <CardContent className='flex-1 flex flex-col justify-between overflow-hidden'>
            <Conversation
              ticketId={ticket.id}
              source={ticket.source}
              messages={ticket.messages}
              currentStatus={ticket.status}
            />
          </CardContent>
        </Card>

        <div className='flex min-w-0 flex-col gap-4'>
          <Card>
            <CardHeader className='px-4 py-4 sm:px-6'>
              <CardTitle className='text-base'>Ticket Details</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='px-4 py-4 sm:px-6'>
              <dl className='space-y-4 text-sm'>
                <div className='flex items-center justify-between gap-4'>
                  <dt className='text-muted-foreground'>Status</dt>

                  <dd>
                    <TicketStatusSelect
                      ticketId={ticket.id}
                      status={ticket.status}
                    />
                  </dd>
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <dt className='text-muted-foreground'>Priority</dt>

                  <dd>
                    <TicketPrioritySelect
                      ticketId={ticket.id}
                      priority={ticket.priority}
                    />
                  </dd>
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <dt className='text-muted-foreground'>Source</dt>

                  <dd>
                    <TicketSourceBadge source={ticket.source} />
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='px-4 py-4 sm:px-6'>
              <CardTitle className='text-base'>Client</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='px-4 py-4 sm:px-6'>
              <dl className='space-y-3 text-sm'>
                <div className='flex flex-col gap-1'>
                  <dt className='text-xs text-muted-foreground'>Name</dt>
                  <dd className='font-medium text-slate-900'>
                    {ticket.contact.name}
                  </dd>
                </div>

                <div className='flex flex-col gap-1'>
                  <dt className='text-xs text-muted-foreground'>Email</dt>
                  <dd className='break-all text-slate-700'>
                    {ticket.contact.email ?? '-'}
                  </dd>
                </div>

                <div className='flex flex-col gap-1'>
                  <dt className='text-xs text-muted-foreground'>Phone</dt>
                  <dd className='text-slate-700'>
                    {ticket.contact.phone ?? '-'}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='px-4 py-4 sm:px-6'>
              <CardTitle className='text-base'>Internal notes</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='px-4 py-4 sm:px-6'>
              <div className='rounded-md bg-slate-100 p-3'>
                {ticket.internalNotes ? (
                  <p className='text-sm leading-6 text-slate-700'>
                    {ticket.internalNotes}
                  </p>
                ) : (
                  <p className='text-sm italic text-muted-foreground'>
                    No internal notes available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

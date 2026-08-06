import TicketPriorityBadge from '@/components/ticket-priority-badge';
import TicketSourceBadge from '@/components/ticket-source-badge';
import TicketStatusBadge from '@/components/ticket-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAuth } from '@/lib/auth-utils';
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
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const ticket = await prisma.ticket.findFirst({
    where: { id, organizationId: orgUser.organizationId },
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
    <>
      <div className='flex justify-between items-center gap-4 pt-6'>
        <div className='flex flex-col gap-4'>
          <p className='text-slate-700/90 text-sm'>
            Ticket #{ticket.ticketNumber}
          </p>
          <h1 className='text-2xl font-bold'>{ticket.subject}</h1>
          <div className='flex items-center gap-2 mt-1'>
            <TicketStatusBadge status={ticket.status} />
            <TicketPriorityBadge priority={ticket.priority} />
            <TicketSourceBadge source={ticket.source} />
            <p className='text-sm text-muted-foreground flex justify-between items-center gap-2'>
              <span>{ticket.contact.name}</span>
              {' • '}
              <time dateTime={ticket.createdAt.toISOString()}>
                {ticket.createdAt.toLocaleString('ro-RO', {
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </p>
          </div>
        </div>
        <TicketActions
          ticketId={ticket.id}
          status={ticket.status}
          priority={ticket.priority}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-6'>
        <Card className='col-span-3 h-4/5'>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
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
        <div className='flex flex-col gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <Separator className='text-slate-500' />
            <CardContent>
              <dl className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700'>
                <dt>Status</dt>
                <dd>
                  <TicketStatusSelect
                    ticketId={ticket.id}
                    status={ticket.status}
                  />
                </dd>

                <dt>Priority</dt>
                <dd>
                  <TicketPrioritySelect
                    ticketId={ticket.id}
                    priority={ticket.priority}
                  />
                </dd>
                <dt>Source</dt>
                <dd>
                  <TicketSourceBadge source={ticket.source} />
                </dd>
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Client</CardTitle>
            </CardHeader>
            <Separator className='text-slate-500' />
            <CardContent>
              <dl className='grid grid-cols-2 gap-y-2 text-xs text-slate-700'>
                <dt>Name</dt>
                <dd>{ticket.contact.name}</dd>

                <dt>Email</dt>
                <dd>{ticket.contact.email ?? '-'}</dd>

                <dt>Phone</dt>
                <dd>{ticket.contact.phone ?? '-'}</dd>
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <Separator className='text-slate-500' />
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Internal notes</CardTitle>
            </CardHeader>
            <Separator className='text-slate-500' />
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

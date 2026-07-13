import TicketPriorityBadge from '@/components/ticket-priority-badge';
import TicketSourceBadge from '@/components/ticket-source-badge';
import TicketStatusBadge from '@/components/ticket-status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { Separator } from '@/components/ui/separator';
import { UserIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import Conversation from '@/components/ticket/conversation';

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
            Ticket #{ticket.id.slice(0, 5).toUpperCase()}
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
        <div className='flex gap-2'>
          <Button className='bg-neutral-50 text-slate-800 hover:bg-neutral-100'>
            <UserIcon className='w-4 h-4' /> Assign
          </Button>
          <Button className='bg-linear-to-r from-blue-600 to-purple-500 text-slate-50 hover:from-blue-700 hover:to-purple-600'>
            Close Ticket
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-6'>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <Conversation source={ticket.source} messages={ticket.messages} />
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
                  <TicketStatusBadge status={ticket.status} />
                </dd>

                <dt>Priority</dt>
                <dd>
                  <TicketPriorityBadge priority={ticket.priority} />
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

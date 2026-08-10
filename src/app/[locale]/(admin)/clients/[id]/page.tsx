import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-utils';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TicketStatusBadge from '@/components/ticket-status-badge';
import TicketPriorityBadge from '@/components/ticket-priority-badge';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getTicketTitle } from '@/utils/get-ticket-title';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ClientPage({ params }: Props) {
  const { id } = await params;
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const contact = await prisma.contact.findFirst({
    where: {
      id,
      organizationId: orgUser.organizationId,
    },
    include: {
      tickets: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc',
            },
            take: 1,
          },
        },
      },
    },
  });

  if (!contact) notFound();

  const openTickets = contact.tickets.filter(
    (t) => t.status !== 'CLOSED',
  ).length;

  const closedTickets = contact.tickets.filter(
    (t) => t.status === 'CLOSED',
  ).length;

  return (
    <>
      <div className='flex items-center justify-between my-6'>
        <div className='flex items-center gap-4'>
          <Avatar className='w-12  h-12'>
            <AvatarFallback className='bg-linear-to-br from-indigo-500 to-violet-500 text-neutral-50 text-lg font-semibold'>
              {contact.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-2xl font-bold'>{contact.name}</h1>

            <p className='text-sm text-muted-foreground/90'>
              Client since
              <time className='ml-1' dateTime={contact.createdAt.toISOString()}>
                {contact.createdAt.toLocaleDateString('ro-RO', {
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between gap-4 max-w-5xl my-6'>
        <Card className='w-sm p-0 rounded-sm'>
          <CardContent className='p-4'>
            <div className='font-bold text-3xl text-blue-600'>
              {contact.tickets.length}
            </div>
            <div className='text-muted-foreground text-sm'>Total tickets</div>
          </CardContent>
        </Card>
        <Card className='w-sm p-0 rounded-sm'>
          <CardContent className='p-4'>
            <div className='font-bold text-red-600 text-3xl'>{openTickets}</div>
            <div className='text-muted-foreground text-sm'>Open</div>
          </CardContent>
        </Card>
        <Card className='w-sm p-0 rounded-sm'>
          <CardContent className='p-4'>
            <div className='font-bold text-green-600 text-3xl'>
              {closedTickets}
            </div>
            <div className='text-muted-foreground text-sm'>Closed</div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='col-span-3'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Tickets ({contact.tickets.length})</CardTitle>
            <span className='text-sm text-muted-foreground'>
              {openTickets} open
            </span>
          </CardHeader>
          <CardContent>
            {contact.tickets.length === 0 ? (
              <div className='text-center py-12 text-sm text-muted-foreground'>
                No tickets yet for this client.
              </div>
            ) : (
              <div className='flex flex-col divide-y'>
                {contact.tickets.map((ticket) => (
                  <Link
                    key={ticket.id}
                    href={`/tickets/${ticket.id}`}
                    className='flex items-center gap-3 py-3 hover:bg-slate-50 px-2 rounded-lg transition'
                  >
                    <span className='text-xs text-muted-foreground font-mono min-w-15'>
                      #{ticket.ticketNumber}
                    </span>
                    <span className='flex-1 text-sm font-medium truncate'>
                      {getTicketTitle(ticket)}
                    </span>
                    <TicketStatusBadge status={ticket.status} />
                    <TicketPriorityBadge priority={ticket.priority} />
                    <span className='text-xs text-muted-foreground'>
                      {ticket.createdAt.toLocaleDateString('ro-RO')}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className='flex flex-col gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Contact info</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <dl className='grid grid-cols-2 gap-8 text-xs tracking-wide'>
                <dt className='text-muted-foreground font-medium'>Name</dt>
                <dd>{contact.name ?? '-'}</dd>

                <dt className='text-muted-foreground font-medium'>Email</dt>
                <dd>{contact.email ?? '-'}</dd>

                <dt className='text-muted-foreground font-medium'>Phone</dt>
                <dd>{contact.phone ?? '-'}</dd>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

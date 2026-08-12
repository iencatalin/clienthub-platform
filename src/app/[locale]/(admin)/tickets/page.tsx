import TicketFilter from '@/components/ticket/ticket-filters';
import TicketPriorityBadge from '@/components/ticket/ticket-priority-badge';
import TicketSourceBadge from '@/components/ticket/ticket-source-badge';
import TicketStatusBadge from '@/components/ticket/ticket-status-badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { requirePermission } from '@/lib/auth-utils';

import { getAllTickets, getTicketCounts } from '@/lib/queries/tickets';
import { getTicketTitle } from '@/utils/get-ticket-title';
import Link from 'next/link';
import { TicketPriority, TicketSource, TicketStatus } from '@/types';
import TicketSourceFilter from '@/components/ticket/ticket-source-filter';
import TicketPriorityFilter from '@/components/ticket/ticket-priority-filter';

type Props = {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    source?: string;
    search?: string;
  }>;
};

export default async function Tickets({ searchParams }: Props) {
  const { orgUser } = await requirePermission('tickets:read');

  const params = await searchParams;

  const tickets = await getAllTickets(orgUser.organizationId, {
    status: params.status as TicketStatus | undefined,
    priority: params.priority as TicketPriority | undefined,
    source: params.source as TicketSource | undefined,
    search: params.search,
  });

  const counts = await getTicketCounts(orgUser.organizationId);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
        <div>
          <h1 className='text-2xl font-bold pt-6'>Tickets</h1>

          {tickets.length > 0 && (
            <p className='text-sm text-muted-foreground/90 pt-1'>
              {tickets.length} tickets
            </p>
          )}
          <TicketFilter counts={counts} />
          <div className='flex items-center gap-4 pt-10'>
            <TicketSourceFilter />
            <TicketPriorityFilter />
          </div>
        </div>
      </div>

      <Card className='mt-6 overflow-hidden'>
        <CardContent className='p-0'>
          <div className='hidden md:block overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tickets.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='py-10 text-center text-muted-foreground'
                    >
                      No tickets found
                    </TableCell>
                  </TableRow>
                ) : (
                  tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className='font-medium text-muted-foreground'>
                        #{ticket.ticketNumber}
                      </TableCell>

                      <TableCell className='max-w-75 font-medium'>
                        <Link
                          href={`/tickets/${ticket.id}`}
                          className='block truncate hover:underline'
                        >
                          {getTicketTitle(ticket)}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <TicketStatusBadge status={ticket.status} />
                      </TableCell>

                      <TableCell>
                        <TicketPriorityBadge priority={ticket.priority} />
                      </TableCell>

                      <TableCell>
                        <TicketSourceBadge source={ticket.source} />
                      </TableCell>

                      <TableCell className='whitespace-nowrap'>
                        {new Date(ticket.createdAt).toLocaleDateString('ro-RO')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className='divide-y md:hidden'>
            {tickets.length === 0 ? (
              <div className='py-10 text-center text-sm text-muted-foreground'>
                No tickets found
              </div>
            ) : (
              tickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/tickets/${ticket.id}`}
                  className='block p-4'
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0'>
                      <p className='text-xs font-medium text-muted-foreground'>
                        #{ticket.ticketNumber}
                      </p>

                      <p className='mt-1 truncate text-sm font-semibold text-slate-900'>
                        {getTicketTitle(ticket)}
                      </p>
                    </div>

                    <span className='shrink-0 text-xs text-muted-foreground'>
                      {new Date(ticket.createdAt).toLocaleDateString('ro-RO')}
                    </span>
                  </div>

                  <div className='mt-3 flex flex-wrap items-center gap-2'>
                    <TicketStatusBadge status={ticket.status} />
                    <TicketPriorityBadge priority={ticket.priority} />
                    <TicketSourceBadge source={ticket.source} />
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

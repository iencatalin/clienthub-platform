import { SimulateMessageBtn } from '@/components/simulate-message-btn';
import TicketFilter from '@/components/ticket-filters';
import TicketPriorityBadge from '@/components/ticket-priority-badge';
import TicketSourceBadge from '@/components/ticket-source-badge';
import TicketStatusBadge from '@/components/ticket-status-badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOrgUser } from '@/lib/auth-utils';

import { getAllTickets, getTicketCounts } from '@/lib/queries/tickets';
import { getTicketTitle } from '@/utils/get-ticket-title';
import Link from 'next/link';
import { TicketPriority, TicketSource, TicketStatus } from '@/types';
import TicketSourceFilter from '@/components/ticket-source-filter';
import TicketPriorityFilter from '@/components/ticket-priority-filter';

type Props = {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    source?: string;
    search?: string;
  }>;
};

export default async function Tickets({ searchParams }: Props) {
  const { orgUser } = await getOrgUser();

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
        <div className='pr-8'>
          <SimulateMessageBtn />
        </div>
      </div>

      <Card className='mt-6'>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-muted-foreground text-sm'>
                  #
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Subject
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Status
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Priority
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Source
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='text-center py-10 text-muted-foreground'
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
                    <TableCell className='font-medium'>
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className='hover:underline'
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

                    <TableCell>
                      {new Date(ticket.createdAt).toLocaleDateString('ro-RO')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

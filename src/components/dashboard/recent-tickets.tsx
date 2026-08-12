import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import TicketStatusBadge from '../ticket/ticket-status-badge';
import TicketPriorityBadge from '../ticket/ticket-priority-badge';
import Link from 'next/link';
import { getRecentTickets } from '@/lib/queries/tickets';
import { getTicketTitle } from '@/utils/get-ticket-title';

type Props = { organizationId: string };

export default async function RecentTickets({ organizationId }: Props) {
  const recentTickets = await getRecentTickets(organizationId);

  return (
    <Table>
      <TableBody>
        {recentTickets.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className='text-center text-muted-foreground'
            >
              No recent tickets found.
            </TableCell>
          </TableRow>
        )}

        {recentTickets.map((ticket) => (
          <TableRow key={ticket.id} className='border-b border-slate-300/90'>
            <TableCell className='font-medium text-xs text-muted-foreground'>
              #{ticket.ticketNumber}
            </TableCell>
            <TableCell>
              <Link
                href={`/tickets/${ticket.id}`}
                className='text-sm font-semibold hover:underline underline-offset-4'
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

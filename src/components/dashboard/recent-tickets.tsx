import { prisma } from '@/lib/prisma';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import TicketStatusBadge from '../ticket-status-badge';
import TicketPriorityBadge from '../ticket-priority-badge';
import Link from 'next/link';

export type RecentTickets = {
  id: string;
  subject: string | null;
  status: string;
  priority: string;
};

export default async function RecentTickets() {
  const recentTickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      subject: true,
      status: true,
      priority: true,
    },
  });

  return (
    <Table>
      <TableBody>
        {recentTickets.map((ticket) => (
          <TableRow key={ticket.id} className='border-b border-slate-300/90'>
            <TableCell className='font-medium text-muted-foreground'>
              #{ticket.id.slice(0, 4).toUpperCase()}
            </TableCell>
            <TableCell>
              <Link href={`/tickets/${ticket.id}`} className='hover:underline'>
                {ticket.subject}
              </Link>
            </TableCell>
            <TableCell>
              <TicketStatusBadge status={ticket.status} />
            </TableCell>
            <TableCell className='text-right'>
              <TicketPriorityBadge priority={ticket.priority} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

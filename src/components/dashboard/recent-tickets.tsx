import { prisma } from '@/lib/prisma';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import TicketStatusBadge from '../ticket-status-badge';
import TicketPriorityBadge from '../ticket-priority-badge';
import Link from 'next/link';
import TicketSourceBadge from '../ticket-source-badge';
import { requireAuth } from '@/lib/auth-utils';

export default async function RecentTickets() {
  const session = await requireAuth();
  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    select: { organizationId: true },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const recentTickets = await prisma.ticket.findMany({
    where: { organizationId: orgUser.organizationId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      subject: true,
      status: true,
      priority: true,
      source: true,
    },
  });

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
            <TableCell className='font-medium text-muted-foreground'>
              #{ticket.id.slice(0, 4).toUpperCase()}
            </TableCell>
            <TableCell>
              <Link
                href={`/tickets/${ticket.id}`}
                className='font-semibold hover:underline underline-offset-4'
              >
                {ticket.subject}
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

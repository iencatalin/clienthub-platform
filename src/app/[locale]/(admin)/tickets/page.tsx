import { SimulateMessageBtn } from '@/components/simulate-message-btn';
import TicketFilter from '@/components/ticket-filters';
import TicketPriorityBadge from '@/components/ticket-priority-badge';
import TicketSourceBadge from '@/components/ticket-source-badge';
import TicketStatusBadge from '@/components/ticket-status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default async function Tickets() {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    select: { organizationId: true },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const tickets = await prisma.ticket.findMany({
    where: { organizationId: orgUser.organizationId },
    include: {
      contact: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold pt-6'>Tickets</h1>

          {tickets.length > 0 && (
            <p className='text-sm text-muted-foreground/90 pt-1'>
              {tickets.length} tickets
            </p>
          )}
          <TicketFilter />
        </div>
        <div className='pr-8'>
          <SimulateMessageBtn />
        </div>
      </div>
      <div className='flex items-center gap-4 pt-10'>
        <Input
          type='search'
          className='max-w-lg bg-slate-50 text-slate-900 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
          placeholder='Search tickets...'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary'>
              Priority
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Low</DropdownMenuItem>
            <DropdownMenuItem>Medium</DropdownMenuItem>
            <DropdownMenuItem>High</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary'>
              Source <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>WEB</DropdownMenuItem>
            <DropdownMenuItem>PHONE</DropdownMenuItem>
            <DropdownMenuItem>WHATSAPP</DropdownMenuItem>
            <DropdownMenuItem>EMAIL</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                      #{ticket.id.slice(0, 5).toUpperCase()}
                    </TableCell>
                    <TableCell className='font-medium'>
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className='hover:underline'
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

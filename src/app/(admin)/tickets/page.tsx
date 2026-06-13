import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { DotIcon } from 'lucide-react';

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

  const allCount = tickets.length;
  const newCount = tickets.filter((t) => t.status === 'NEW').length;
  const inProgressCount = tickets.filter(
    (t) => t.status === 'IN_PROGRESS',
  ).length;
  const waitingCount = tickets.filter(
    (t) => t.status === 'WAITING_CLIENT',
  ).length;
  const closedCount = tickets.filter((t) => t.status === 'CLOSED').length;

  return (
    <>
      <h1 className='text-2xl font-bold pt-6'>Tickets</h1>
      <p className='text-sm text-muted-foreground/90 pt-1'>
        {tickets.length} open tickets
      </p>
      <div className='flex flex-wrap gap-2 pt-4'>
        <div className='flex flex-wrap bg-sky-50 border border-sky-600 px-3 py-2 rounded-lg'>
          <DotIcon className='w-5 h-5  text-blue-600' />
          All {allCount}
        </div>
        <div className='flex flex-wrap  bg-sky-100 border border-sky-500 px-3 py-2 rounded-lg'>
          <DotIcon />
          New {newCount}
        </div>
        <div className='flex flex-wrap  bg-sky-100 border border-sky-500 px-3 py-2 rounded-lg'>
          <DotIcon />
          In Progress {inProgressCount}
        </div>
        <div className='flex flex-wrap  bg-sky-100 border border-sky-500 px-3 py-2 rounded-lg'>
          <DotIcon />
          Waiting {waitingCount}
        </div>
        <div className='flex flex-wrap  bg-sky-100 border border-sky-500 px-3 py-2 rounded-lg'>
          <DotIcon />
          Closed {closedCount}
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
                  Subject/Client
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
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className='font-medium'>1</TableCell>
                  <TableCell className='font-medium'>
                    {ticket.subject}
                  </TableCell>
                  <TableCell>{ticket.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className='text-right'>$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

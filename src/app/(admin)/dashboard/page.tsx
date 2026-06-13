import TicketsStatusCard from '@/components/dashboard/tickets-status-card';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    select: { organizationId: true },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const [total, open, inProgress, closed] = await Promise.all([
    prisma.ticket.count({ where: { organizationId: orgUser.organizationId } }),
    prisma.ticket.count({
      where: { organizationId: orgUser.organizationId, status: 'NEW' },
    }),
    prisma.ticket.count({
      where: { organizationId: orgUser.organizationId, status: 'IN_PROGRESS' },
    }),
    prisma.ticket.count({
      where: { organizationId: orgUser.organizationId, status: 'CLOSED' },
    }),
  ]);

  return (
    <div className='pt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <TicketsStatusCard
          total={total}
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-5'>
        <Card>
          <CardHeader className='flex items-center justify-between'>
            <CardTitle className='text-slate-800 text-sm font-medium'>
              Tickete recente
            </CardTitle>
            <Link
              href='/tickets'
              className='text-sm text-blue-500 font-semibold flex items-center gap-1'
            >
              Vezi toate
              <ArrowRight className='h-4 w-4 pt-1' />
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow className='border-b border-slate-900'>
                  <TableCell className='font-medium'>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className='text-right'>$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activitate recenta</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tichete pe ultimele 7 zile</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

import TicketsStatusCard from '@/components/dashboard/tickets-status-card';
import RecentTickets from '@/components/dashboard/recent-tickets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { TicketsPieChart } from '@/components/dashboard/pie-chart';

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

  const ticketStats = await prisma.ticket.groupBy({
    by: ['status'],
    where: {
      organizationId: orgUser.organizationId,
    },
    _count: {
      status: true,
    },
  });

  const chartData = [
    {
      status: 'New',
      total: ticketStats.find((t) => t.status === 'NEW')?._count.status ?? 0,
      fill: 'var(--color-new)',
    },
    {
      status: 'In Progress',
      total:
        ticketStats.find((t) => t.status === 'IN_PROGRESS')?._count.status ?? 0,
      fill: 'var(--color-progress)',
    },
    {
      status: 'Closed',
      total: ticketStats.find((t) => t.status === 'CLOSED')?._count.status ?? 0,
      fill: 'var(--color-closed)',
    },
  ];

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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 pt-5'>
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
            <RecentTickets />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-slate-800 text-sm font-medium'>
              Ticket Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TicketsPieChart data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

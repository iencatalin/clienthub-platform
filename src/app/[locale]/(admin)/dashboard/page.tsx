import TicketsStatusCard from '@/components/dashboard/tickets-status-card';
import RecentTickets from '@/components/dashboard/recent-tickets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { getOrgUser } from '@/lib/auth-utils';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { TicketsPieChart } from '@/components/dashboard/pie-chart';
import { getDashboardStats, getTicketStats } from '@/lib/queries/dashboard';
import { getTranslations } from 'next-intl/server';

export default async function DashboardPage() {
  const { orgUser } = await getOrgUser();
  const { organizationId } = orgUser;

  const [stats, ticketStats] = await Promise.all([
    getDashboardStats(organizationId),
    getTicketStats(organizationId),
  ]);

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

  const t = await getTranslations();

  return (
    <div className='pt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <TicketsStatusCard {...stats} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 pt-5'>
        <Card>
          <CardHeader className='flex items-center justify-between'>
            <CardTitle className='text-slate-800 text-sm font-medium'>
              {t('tickets.recentTickets')}
            </CardTitle>
            <Link
              href='/tickets'
              className='text-sm text-blue-500 font-semibold flex items-center gap-1'
            >
              {t('tickets.viewAll')}
              <ArrowRight className='h-4 w-4 pt-1' />
            </Link>
          </CardHeader>
          <CardContent>
            <RecentTickets organizationId={organizationId} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-slate-800 text-sm font-medium'>
              {t('tickets.ticketsByStatus')}
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

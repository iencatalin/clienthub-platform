import { prisma } from '@/lib/prisma';

export async function getDashboardStats(organizationId: string) {
  const [total, open, inProgress, closed] = await Promise.all([
    prisma.ticket.count({ where: { organizationId } }),
    prisma.ticket.count({ where: { organizationId, status: 'NEW' } }),
    prisma.ticket.count({ where: { organizationId, status: 'IN_PROGRESS' } }),
    prisma.ticket.count({ where: { organizationId, status: 'CLOSED' } }),
  ]);

  return { total, open, inProgress, closed };
}

export async function getTicketStats(organizationId: string) {
  return prisma.ticket.groupBy({
    by: ['status'],
    where: { organizationId },
    _count: { status: true },
  });
}

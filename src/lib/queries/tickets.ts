import { prisma } from '@/lib/prisma';

export async function getRecentTickets(organizationId: string) {
  return prisma.ticket.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      ticketNumber: true,
      subject: true,
      status: true,
      priority: true,
      source: true,
      contact: {
        select: { name: true, email: true, phone: true },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: 'asc' },
        select: { body: true },
      },
    },
  });
}

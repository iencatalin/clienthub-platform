import { prisma } from '@/lib/prisma';
import { TicketPriority, TicketSource, TicketStatus } from '@/types';

export type TicketFilters = {
  status?: TicketStatus;
  priority?: TicketPriority;
  source?: TicketSource;
  search?: string;
};

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
      createdAt: true,
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

export async function getAllTickets(
  organizationId: string,
  filters: TicketFilters = {},
) {
  const { status, priority, source, search } = filters;

  return await prisma.ticket.findMany({
    where: {
      organizationId,
      status: status || undefined,
      priority: priority || undefined,
      source: source || undefined,
      subject: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    },
    include: {
      contact: true,
      messages: {
        take: 1,
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          body: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getTicketCounts(organizationId: string) {
  const grouped = await prisma.ticket.groupBy({
    by: ['status'],
    where: {
      organizationId,
    },
    _count: true,
  });

  const total = await prisma.ticket.count({
    where: {
      organizationId,
    },
  });

  return {
    all: total,
    NEW: grouped.find((g) => g.status === 'NEW')?._count ?? 0,
    IN_PROGRESS: grouped.find((g) => g.status === 'IN_PROGRESS')?._count ?? 0,
    WAITING_CLIENT:
      grouped.find((g) => g.status === 'WAITING_CLIENT')?._count ?? 0,
    CLOSED: grouped.find((g) => g.status === 'CLOSED')?._count ?? 0,
  };
}

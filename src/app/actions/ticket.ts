'use server';

import { TicketPriority, TicketStatus } from '@/types';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function closeTicketAction(ticketId: string) {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'CLOSED' },
  });
  revalidatePath(`/tickets/${ticketId}`);
}

export async function updateTicketStatusAction(
  ticketId: string,
  status: TicketStatus,
) {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: { status },
  });
  revalidatePath(`/tickets/${ticketId}`);
}

export async function updateTicketPriorityAction(
  ticketId: string,
  priority: TicketPriority,
) {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: { priority },
  });
  revalidatePath(`/tickets/${ticketId}`);
}

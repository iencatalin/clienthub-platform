'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function closeTicketAction(ticketId: string) {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'CLOSED' },
  });
  revalidatePath(`/tickets/${ticketId}`);
}

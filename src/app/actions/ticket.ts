'use server';

import { TicketPriority, TicketStatus } from '@/types';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth-utils';

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

export async function sendReplyAction(
  ticketId: string,
  body: string,
  currentStatus: string,
) {
  const session = await requireAuth();

  if (!body.trim()) return { error: 'Message is required' };

  try {
    await prisma.message.create({
      data: {
        ticketId,
        body,
        direction: 'OUTBOUND',
        status: 'SENT',
        sentByUserId: session.user.id,
      },
    });
    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        lastMessageAt: new Date(),
        ...(currentStatus === 'NEW' ? { status: 'IN_PROGRESS' } : {}),
      },
    });

    revalidatePath(`/tickets/${ticketId}`);
    return { success: true };
  } catch (error) {
    console.error('sendReplyAction error:', error);
    return { error: 'Something went wrong' };
  }
}

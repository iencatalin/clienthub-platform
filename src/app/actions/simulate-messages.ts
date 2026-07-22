'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-utils';
import { revalidatePath } from 'next/cache';

export async function simulateMessageAction(values: {
  phone?: string;
  email?: string;
  message: string;
  source: 'WHATSAPP' | 'EMAIL';
}) {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    select: { organizationId: true },
  });

  if (!orgUser) return { error: 'Organization not found' };

  const { phone, email, message, source } = values;

  if (!phone && !email) return { error: 'Phone or email is required' };

  let contact = await prisma.contact.findFirst({
    where: {
      organizationId: orgUser.organizationId,
      OR: [...(phone ? [{ phone }] : []), ...(email ? [{ email }] : [])],
    },
  });

  if (!contact) {
    contact = await prisma.contact.create({
      data: {
        organizationId: orgUser.organizationId,
        phone: phone ?? null,
        email: email ?? null,
        name: phone ?? email,
      },
    });
  }

  let ticket = await prisma.ticket.findFirst({
    where: {
      organizationId: orgUser.organizationId,
      contactId: contact.id,
      status: { not: 'CLOSED' },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!ticket) {
    ticket = await prisma.ticket.create({
      data: {
        organizationId: orgUser.organizationId,
        contactId: contact.id,
        source,
        status: 'NEW',
        priority: 'MEDIUM',
        lastMessageAt: new Date(),
      },
    });
  }

  await prisma.message.create({
    data: {
      ticketId: ticket.id,
      direction: 'INBOUND',
      body: message,
      status: 'DELIVERED',
    },
  });

  await prisma.ticket.update({
    where: { id: ticket.id },
    data: { lastMessageAt: new Date() },
  });

  revalidatePath('/tickets');

  return { success: true, ticketId: ticket.id };
}

'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-utils';
import { createSimulateMessageSchema } from '@/lib/validators/simulate-message';

export async function simulateMessageAction(values: unknown) {
  try {
    const session = await requireAuth();

    const parsed = createSimulateMessageSchema.safeParse(values);

    if (!parsed.success) {
      return {
        error: parsed.error.issues[0]?.message ?? 'Invalid input',
      };
    }

    const { name, phone, message, source } = parsed.data;

    const orgUser = await prisma.organizationUser.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        organizationId: true,
      },
    });

    if (!orgUser) {
      return {
        error: 'Organization not found',
      };
    }

    let contact = await prisma.contact.findUnique({
      where: {
        organizationId_phone: {
          organizationId: orgUser.organizationId,
          phone,
        },
      },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          organizationId: orgUser.organizationId,
          name,
          phone,
        },
      });
    }

    let ticket = await prisma.ticket.findFirst({
      where: {
        organizationId: orgUser.organizationId,
        contactId: contact.id,
        source,
        status: {
          not: 'CLOSED',
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
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

    await prisma.$transaction(async (tx) => {
      await tx.message.create({
        data: {
          ticketId: ticket.id,
          direction: 'INBOUND',
          body: message,
          status: 'DELIVERED',
          externalId: crypto.randomUUID(),
        },
      });

      await tx.ticket.update({
        where: {
          id: ticket.id,
        },
        data: {
          lastMessageAt: new Date(),
        },
      });
    });

    revalidatePath('/tickets');
    revalidatePath(`/tickets/${ticket.id}`);

    return {
      success: true,
      ticketId: ticket.id,
    };
  } catch (error) {
    console.error('simulateMessageAction error:', error);

    return {
      error: 'Something went wrong',
    };
  }
}

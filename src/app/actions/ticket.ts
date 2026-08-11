'use server';

import { TicketPriority, TicketStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/lib/auth-utils';

const ticketIdSchema = z.string().uuid();

const messageBodySchema = z
  .string()
  .trim()
  .min(1, 'Message is required')
  .max(5000, 'Message is too long');

const ticketStatusSchema = z.nativeEnum(TicketStatus);

const ticketPrioritySchema = z.nativeEnum(TicketPriority);

export async function closeTicketAction(ticketId: string) {
  try {
    const parsedTicketId = ticketIdSchema.safeParse(ticketId);

    if (!parsedTicketId.success) {
      return {
        error: 'Invalid ticket ID',
      };
    }

    const { orgUser } = await requirePermission('tickets:close');

    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parsedTicketId.data,
        organizationId: orgUser.organizationId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!ticket) {
      return {
        error: 'Ticket not found',
      };
    }

    if (ticket.status === TicketStatus.CLOSED) {
      return {
        success: true,
      };
    }

    await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        status: TicketStatus.CLOSED,
      },
    });

    revalidatePath(`/tickets/${ticket.id}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('closeTicketAction error:', error);

    return {
      error: 'Something went wrong',
    };
  }
}

export async function updateTicketStatusAction(
  ticketId: string,
  status: TicketStatus,
) {
  try {
    const parsedTicketId = ticketIdSchema.safeParse(ticketId);

    const parsedStatus = ticketStatusSchema.safeParse(status);

    if (!parsedTicketId.success) {
      return {
        error: 'Invalid ticket ID',
      };
    }

    if (!parsedStatus.success) {
      return {
        error: 'Invalid ticket status',
      };
    }

    const { orgUser } = await requirePermission('tickets:update');

    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parsedTicketId.data,
        organizationId: orgUser.organizationId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!ticket) {
      return {
        error: 'Ticket not found',
      };
    }

    if (ticket.status === parsedStatus.data) {
      return {
        success: true,
      };
    }

    await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        status: parsedStatus.data,
      },
    });

    revalidatePath(`/tickets/${ticket.id}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('updateTicketStatusAction error:', error);

    return {
      error: 'Something went wrong',
    };
  }
}

export async function updateTicketPriorityAction(
  ticketId: string,
  priority: TicketPriority,
) {
  try {
    const parsedTicketId = ticketIdSchema.safeParse(ticketId);

    const parsedPriority = ticketPrioritySchema.safeParse(priority);

    if (!parsedTicketId.success) {
      return {
        error: 'Invalid ticket ID',
      };
    }

    if (!parsedPriority.success) {
      return {
        error: 'Invalid ticket priority',
      };
    }

    const { orgUser } = await requirePermission('tickets:update');

    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parsedTicketId.data,
        organizationId: orgUser.organizationId,
      },
      select: {
        id: true,
        priority: true,
      },
    });

    if (!ticket) {
      return {
        error: 'Ticket not found',
      };
    }

    if (ticket.priority === parsedPriority.data) {
      return {
        success: true,
      };
    }

    await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        priority: parsedPriority.data,
      },
    });

    revalidatePath(`/tickets/${ticket.id}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('updateTicketPriorityAction error:', error);

    return {
      error: 'Something went wrong',
    };
  }
}

export async function sendReplyAction(ticketId: string, body: string) {
  try {
    const parsedTicketId = ticketIdSchema.safeParse(ticketId);

    const parsedBody = messageBodySchema.safeParse(body);

    if (!parsedTicketId.success) {
      return {
        error: 'Invalid ticket ID',
      };
    }

    if (!parsedBody.success) {
      return {
        error: parsedBody.error.issues[0]?.message ?? 'Invalid message',
      };
    }

    const { session, orgUser } = await requirePermission('tickets:update');

    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parsedTicketId.data,
        organizationId: orgUser.organizationId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!ticket) {
      return {
        error: 'Ticket not found',
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.message.create({
        data: {
          ticketId: ticket.id,
          body: parsedBody.data,
          direction: 'OUTBOUND',
          status: 'SENT',
          sentByUserId: session.user.id,
        },
      });

      await tx.ticket.update({
        where: {
          id: ticket.id,
        },
        data: {
          lastMessageAt: new Date(),

          ...(ticket.status === TicketStatus.NEW
            ? {
                status: TicketStatus.IN_PROGRESS,
              }
            : {}),
        },
      });
    });

    revalidatePath(`/tickets/${ticket.id}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('sendReplyAction error:', error);

    return {
      error: 'Something went wrong',
    };
  }
}

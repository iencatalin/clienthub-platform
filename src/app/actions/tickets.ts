'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createTicketManualSchema } from '@/lib/validators/ticket';
import { revalidatePath } from 'next/cache';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createTicketAction(values: unknown) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { error: 'Unauthorized' };

  const parsed = createTicketManualSchema.safeParse(values);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
  });

  if (!orgUser) {
    return { error: 'Organization not found' };
  }

  try {
    await prisma.ticket.create({
      data: {
        organizationId: orgUser.organizationId,
        contactId: parsed.data.contactId,
        source: parsed.data.source,
        subject: parsed.data.subject,
        priority: parsed.data.priority,
        assignedToId: parsed.data.assignedToId ?? null,
        internalNotes: parsed.data.internalNotes ?? null,
        status: 'NEW',
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Something went wrong. Please try again' };
  }
  revalidatePath('/tickets');
  redirect('/tickets');
}

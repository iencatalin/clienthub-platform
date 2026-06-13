'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createContactSchema } from '@/lib/validators/contact';
import { headers } from 'next/headers';

export async function createContactAction(values: unknown) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { error: 'Unauthorized' };

  const parsed = createContactSchema.safeParse(values);

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
    const contact = await prisma.contact.create({
      data: {
        organizationId: orgUser.organizationId,
        name: parsed.data.name ?? null,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone ?? null,
      },
    });
    return { contactId: contact.id, contact: contact };
  } catch (error) {
    console.error(error);
    return { error: 'Something went wrong. Please try again' };
  }
}

'use server';

import { prisma } from '@/lib/prisma';

import { requirePermission } from '@/lib/auth-utils';

import { createContactSchema } from '@/lib/validators/contact';

export async function createContactAction(values: unknown) {
  const parsed = createContactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Invalid contact data',
    };
  }

  try {
    const { orgUser } = await requirePermission('clients:create');

    const contact = await prisma.contact.create({
      data: {
        organizationId: orgUser.organizationId,
        name: parsed.data.name ?? null,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone ?? null,
      },
    });

    return {
      success: true,
      contactId: contact.id,
      contact,
    };
  } catch (error) {
    console.error('createContactAction error:', error);

    return {
      error: 'Something went wrong. Please try again',
    };
  }
}

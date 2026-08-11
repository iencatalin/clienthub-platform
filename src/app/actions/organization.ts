'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/lib/auth-utils';
import { organizationSchema } from '@/lib/validators/organization';

export default async function updateOrganizationAction(
  id: string,
  values: unknown,
) {
  const parsed = organizationSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Invalid organization data',
    };
  }

  try {
    const { orgUser } = await requirePermission('organization:update');

    if (id !== orgUser.organizationId) {
      return {
        error: 'Organization not found',
      };
    }

    await prisma.organization.update({
      where: {
        id: orgUser.organizationId,
      },
      data: parsed.data,
    });

    revalidatePath('/settings/organization');

    return {
      success: true,
    };
  } catch (error) {
    console.error('updateOrganizationAction error:', error);

    return {
      error: 'Something went wrong',
    };
  }
}

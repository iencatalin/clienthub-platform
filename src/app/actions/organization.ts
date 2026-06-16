'use server';
import { prisma } from '@/lib/prisma';
import { organizationSchema } from '@/lib/validators/organizaton';
import { revalidatePath } from 'next/cache';

export default async function updateOrganizationAction(
  id: string,
  values: unknown,
) {
  const parsed = organizationSchema.safeParse(values);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await prisma.organization.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath('/settings/organization');
  } catch {
    return { error: 'Something went wrong' };
  }
}

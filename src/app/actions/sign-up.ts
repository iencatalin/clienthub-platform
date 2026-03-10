'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { signUpSchema } from '@/lib/validators/sign-up';

export async function signUpAction(values: unknown) {
  const parsed = signUpSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0].message,
    };
  }

  const { name, email, password, organizationName } = parsed.data;

  try {
    const { user } = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: { name: organizationName },
      });

      await tx.organizationUser.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          role: 'ADMIN',
        },
      });
    });
  } catch {
    return { error: 'An unexpected error occurred. Please try again.' };
  }

  redirect('/dashboard');
}

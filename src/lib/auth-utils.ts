import { headers } from 'next/headers';
import { auth } from './auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

async function getAuthSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export const requireAuth = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect('/sign-in');
  }
  return session;
};

export const requireNoAuth = async () => {
  const session = await getAuthSession();

  if (session) {
    redirect('/dashboard');
  }
  return session;
};

export const getOrgUser = async () => {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    select: { organizationId: true },
  });

  if (!orgUser) redirect('/sign-in');

  return { session, orgUser };
};

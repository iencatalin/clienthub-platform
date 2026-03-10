import { headers } from 'next/headers';
import { auth } from './auth';
import { redirect } from 'next/navigation';

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

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { OrganizationRole } from '@prisma/client';

import { auth } from './auth';
import { prisma } from '@/lib/prisma';

export type Permission =
  | 'tickets:read'
  | 'tickets:create'
  | 'tickets:update'
  | 'tickets:close'
  | 'tickets:assign'
  | 'clients:read'
  | 'clients:create'
  | 'clients:update'
  | 'members:read'
  | 'members:manage'
  | 'organization:update';

const rolePermissions: Record<OrganizationRole, readonly Permission[]> = {
  OWNER: [
    'tickets:read',
    'tickets:create',
    'tickets:update',
    'tickets:close',
    'tickets:assign',
    'clients:read',
    'clients:create',
    'clients:update',
    'members:read',
    'members:manage',
    'organization:update',
  ],

  ADMIN: [
    'tickets:read',
    'tickets:create',
    'tickets:update',
    'tickets:close',
    'tickets:assign',
    'clients:read',
    'clients:create',
    'clients:update',
    'members:read',
    'members:manage',
  ],

  AGENT: [
    'tickets:read',
    'tickets:create',
    'tickets:update',
    'tickets:close',
    'clients:read',
    'clients:create',
    'clients:update',
  ],
};

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

  const orgUser = await prisma.organizationUser.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      organizationId: true,
      role: true,
    },
  });

  if (!orgUser) {
    throw new Error(
      'Authenticated user is not associated with an organization',
    );
  }

  return {
    session,
    orgUser,
  };
};

export const requirePermission = async (permission: Permission) => {
  const { session, orgUser } = await getOrgUser();

  const permissions = rolePermissions[orgUser.role];

  if (!permissions.includes(permission)) {
    throw new Error('Forbidden');
  }

  return {
    session,
    orgUser,
  };
};

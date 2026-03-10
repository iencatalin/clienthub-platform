import { requireAuth } from '@/lib/auth-utils';
import React from 'react';

export default async function DashboardPage() {
  await requireAuth();
  return <div>DashboardPage</div>;
}

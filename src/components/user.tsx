'use client';
import { authClient } from '@/lib/auth-client';
import { User2 } from 'lucide-react';

export function User() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex justify-between items-center gap-4'>
      <User2 className='size-4' />
      <span>{session?.user.name}</span>
    </div>
  );
}

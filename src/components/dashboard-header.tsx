'use client';

import { BellIcon, SearchIcon } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { getGreeting } from '@/utils/get-greeting';

export function DashboardHeader() {
  const { data: session } = authClient.useSession();
  return (
    <header className='flex h-16 shrink-0 items-center shadow-md bg-white rounded-lg gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1 md:hidden block' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4 md:hidden block'
        />

        <h2 className='text-xl font-bold'>
          <span className='text-slate-500'>{getGreeting()}, </span>
          {session?.user.name}
        </h2>
      </div>
      <div className='ml-auto flex items-center gap-2 pr-8'>
        <div className=''>
          <SearchIcon className='size-4' />
        </div>
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />
        <div>
          <BellIcon className='size-4' />
        </div>
      </div>
    </header>
  );
}

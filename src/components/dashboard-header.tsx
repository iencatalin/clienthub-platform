'use client';

import { BellIcon, SearchIcon } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';

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
        <div className='flex items-center gap-1 text-sm'>
          <h2>Welcome back,{session?.user.name} </h2>
        </div>
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

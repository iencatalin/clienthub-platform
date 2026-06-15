'use client';

import { BellIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { getGreeting } from '@/utils/get-greeting';

import formatToday from '@/utils/format-date';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const showButton = pathname !== '/tickets/new';
  return (
    <header className='flex h-16 shrink-0 items-center shadow-md bg-white rounded-lg gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex flex-row md:flex-col md:items-start items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1 md:hidden block' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4 md:hidden block'
        />

        <p className='text-xs text-muted-foreground '>{formatToday()}</p>
        <h2 className='text-sm md:text-xl font-bold text-slate-900'>
          {getGreeting()},
          <span className='text-indigo-600 ml-1'>{session?.user.name} 👋</span>
        </h2>
      </div>
      <div className='ml-auto flex items-center gap-2 pr-1 md:pr-4'>
        <Button variant='outline' className='bg-white flex items-center'>
          <SearchIcon className='size-4' />
        </Button>

        <Button variant='outline' className='bg-white flex items-center'>
          <BellIcon className='size-4' />
        </Button>

        {showButton && (
          <Link
            href='/tickets/new'
            className='hidden md:flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-500 text-slate-50 rounded-lg px-4 py-2 text-sm font-semibold shadow-md hover:-translate-y-px transition'
          >
            <PlusIcon className='w-4 h-4' />
            <span>New Ticket</span>
          </Link>
        )}
      </div>
    </header>
  );
}

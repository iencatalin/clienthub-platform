import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import formatDate from '@/utils/format-date';
import { BellIcon, CalendarIcon, SearchIcon } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1 md:hidden block' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4 md:hidden block'
            />
            <div className='flex items-center gap-1 text-sm'>
              <CalendarIcon className='size-4' />
              <span> {formatDate()} </span>
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
        <Separator orientation='horizontal' className='mb-3 ' />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

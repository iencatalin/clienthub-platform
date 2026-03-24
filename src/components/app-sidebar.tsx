'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  CheckCircleIcon,
  HomeIcon,
  SettingsIcon,
  Ticket,
  Users2,
} from 'lucide-react';

import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: HomeIcon,
    },
    {
      title: 'Tickets',
      url: '/tickets',
      icon: Ticket,
    },
    {
      title: 'Clients',
      url: '/clients',
      icon: Users2,
    },
  ],

  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: SettingsIcon,
      items: [
        {
          title: 'Organization',
          url: '/settings/organization',
        },
        {
          title: 'Members',
          url: '/settings/members',
        },

        {
          title: 'Whatsapp',
          url: '/settings/whatsapp',
        },
        {
          title: 'Email',
          url: '/settings/email',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <div className='border-b border-slate-200/50 flex items-center py-8'>
                <div className='w-8 h-8 flex items-center justify-center shadow-lg bg-linear-to-r from-blue-600 to-purple-500 rounded-xl'>
                  <CheckCircleIcon className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h1 className='md:text-lg text-sm font-bold text-slate-800'>
                    Revelio ClientHub
                  </h1>
                  <p className='text-xs text-slate-500 md:block hidden'>
                    Admin panel
                  </p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

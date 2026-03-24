import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { DashboardHeader } from '@/components/dashboard-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='p-2'>
        <DashboardHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

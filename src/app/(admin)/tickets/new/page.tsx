import TicketForm from '@/components/ticket-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PlusSquare } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function NewTickets() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect('/sign-in');

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
  });

  if (!orgUser) redirect('/sign-in');

  const contacts = await prisma.contact.findMany({
    where: { organizationId: orgUser.organizationId },
    select: { id: true, name: true, email: true, phone: true },
  });
  return (
    <Card className='mt-10 p-4'>
      <CardHeader>
        <div className='flex items-center gap-3 mb-4'>
          <div className='bg-gray-300/20 rounded-md p-1'>
            <PlusSquare className='size-8 text-purple-400' />
          </div>
          <div>
            <CardTitle className='font-bold text-xl text-slate-950 leading-tight'>
              New Ticket
            </CardTitle>
            <CardDescription className='text-slate-500 pt-1'>
              Create a new ticket
            </CardDescription>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <TicketForm contacts={contacts} />
      </CardContent>
    </Card>
  );
}

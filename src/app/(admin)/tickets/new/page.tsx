import TicketForm from '@/components/ticket-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
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
        <CardTitle>New Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <TicketForm contacts={contacts} />
      </CardContent>
    </Card>
  );
}

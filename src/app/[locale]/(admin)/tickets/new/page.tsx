import TicketForm from '@/components/ticket-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Separator } from '@base-ui/react';
import { Plus } from 'lucide-react';
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
    <div className='mt-6'>
      <div className='flex items-center gap-4 border-slate-300/90 border-b pb-4'>
        <div className='bg-purple-200/90 border border-purple-600 rounded-md p-1'>
          <Plus className='size-8 text-purple-600' />
        </div>
        <div>
          <h2 className='text-2xl font-semibold text-slate-900'>New ticket</h2>
          <p className='text-slate-500/90 text-sm'>
            Create a new support ticket manually
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4'>
        <div className='col-span-3'>
          <TicketForm contacts={contacts} />
        </div>

        <Card className='h-full lg:h-2/4 max-h-full'>
          <CardHeader>
            <CardTitle className='text-base text-slate-900 font-semibold'>
              💡 Tips
            </CardTitle>
          </CardHeader>
          <Separator className='text-slate-500/90' />
          <CardContent>
            <ul className=' flex flex-col text-sm gap-5'>
              <li>
                <span className='bg-sky-200/90 p-1 rounded-md mr-1'>📬</span>
                <span className='text-slate-900 font-semibold mr-1'>
                  No contact?
                </span>
                Click &quot;Create new contact&quot; in the dropdown to add one
                on the spot.
              </li>
              <li>
                <span className='bg-amber-200/90 p-1 rounded-md mr-1'>⚡</span>
                <span className='text-slate-900 font-semibold mr-1'>
                  Source = Phone
                </span>
                means the client called. Add a summary of the conversation in
                the subject.
              </li>
              <li>
                <span className='bg-cyan-200/90 p-1 rounded-md mr-1'>🔒</span>
                <span className='text-slate-900 font-semibold mr-1'>
                  Internal notes
                </span>
                are only visible to your team — never to the client.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

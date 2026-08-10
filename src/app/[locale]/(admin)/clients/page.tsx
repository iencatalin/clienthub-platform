import { Card, CardContent } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default async function ClientsPage() {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    select: { organizationId: true },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const clients = await prisma.contact.findMany({
    where: {
      organizationId: orgUser.organizationId,
    },
    include: {
      _count: {
        select: { tickets: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold pt-6'>Clients</h1>
          <p className='text-sm text-muted-foreground/90 pt-1'>
            {clients.length} clients
          </p>
        </div>
        <Link
          href='/clients/new'
          className='hidden md:flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-500 text-slate-50 rounded-lg px-4 py-2 text-sm font-semibold shadow-md hover:-translate-y-px transition'
        >
          <PlusIcon className='w-4 h-4' />
          <span>New Client</span>
        </Link>
      </div>
      <div className='flex items-center gap-4 mt-2  '>
        <Input
          type='search'
          className='max-w-lg bg-slate-50 text-slate-900 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
          placeholder='Search by name, email, phone...'
        />
      </div>
      <Card className='mt-6'>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-muted-foreground text-sm'>
                  #
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Client
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Email
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Phone
                </TableHead>
                <TableHead className='text-muted-foreground text-sm'>
                  Tickets
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className='font-medium text-muted-foreground'>
                    #{client.contactNumber}
                  </TableCell>
                  <TableCell className='font-medium'>
                    <Link
                      href={`/clients/${client.id}`}
                      className='hover:underline font-semibold'
                    >
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client._count.tickets}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

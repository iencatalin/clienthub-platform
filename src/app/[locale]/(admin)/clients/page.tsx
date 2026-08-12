import { Card, CardContent } from '@/components/ui/card';
import { requirePermission } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { PlusIcon, Mail, Phone, Ticket } from 'lucide-react';
import Link from 'next/link';

export default async function ClientsPage() {
  const { orgUser } = await requirePermission('clients:read');

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
      <div className='flex items-center justify-between gap-4 pt-6'>
        <div className='min-w-0'>
          <h1 className='text-2xl font-bold'>Clients</h1>

          <p className='pt-1 text-sm text-muted-foreground/90'>
            {clients.length} {clients.length === 1 ? 'client' : 'clients'}
          </p>
        </div>

        <Link
          href='/clients/new'
          className='flex shrink-0 items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-500 px-3 py-2 text-sm font-semibold text-slate-50 shadow-md transition hover:-translate-y-px md:px-4'
        >
          <PlusIcon className='size-4' />
          <span className='hidden sm:inline'>New Client</span>
          <span className='sm:hidden'>New</span>
        </Link>
      </div>

      <Card className='mt-6 hidden md:block'>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                    #
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                    Client
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                    Email
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                    Phone
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                    Tickets
                  </th>
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className='border-b last:border-0 hover:bg-slate-50/70'
                  >
                    <td className='px-4 py-4 font-medium text-muted-foreground'>
                      #{client.contactNumber}
                    </td>

                    <td className='px-4 py-4 font-semibold'>
                      <Link
                        href={`/clients/${client.id}`}
                        className='hover:underline'
                      >
                        {client.name}
                      </Link>
                    </td>

                    <td className='px-4 py-4'>{client.email || '-'}</td>

                    <td className='px-4 py-4'>{client.phone || '-'}</td>

                    <td className='px-4 py-4'>
                      <span className='inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700'>
                        <Ticket className='size-3.5' />
                        {client._count.tickets}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {clients.length === 0 && (
              <div className='py-12 text-center text-sm text-muted-foreground'>
                No clients found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className='mt-6 space-y-3 md:hidden'>
        {clients.length === 0 ? (
          <Card>
            <CardContent className='py-12 text-center text-sm text-muted-foreground'>
              No clients found.
            </CardContent>
          </Card>
        ) : (
          clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className='block'
            >
              <Card className='transition hover:border-slate-300 hover:shadow-sm'>
                <CardContent className='p-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0'>
                      <p className='truncate font-semibold text-slate-900'>
                        {client.name}
                      </p>

                      <p className='mt-0.5 text-xs text-muted-foreground'>
                        #{client.contactNumber}
                      </p>
                    </div>

                    <span className='inline-flex shrink-0 items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700'>
                      <Ticket className='size-3.5' />
                      {client._count.tickets}
                    </span>
                  </div>

                  <div className='mt-4 space-y-2 border-t pt-3'>
                    {client.email && (
                      <div className='flex min-w-0 items-center gap-2 text-sm text-muted-foreground'>
                        <Mail className='size-4 shrink-0' />
                        <span className='truncate'>{client.email}</span>
                      </div>
                    )}

                    {client.phone && (
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Phone className='size-4 shrink-0' />
                        <span>{client.phone}</span>
                      </div>
                    )}

                    {!client.email && !client.phone && (
                      <p className='text-sm italic text-muted-foreground'>
                        No contact information
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default async function EmailSettingsPage() {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const emailAddresses = await prisma.emailAddress.findMany({
    where: { organizationId: orgUser.organizationId },
  });

  return (
    <div className='mt-4 space-y-4'>
      <h1 className='text-3xl font-bold text-slate-950'>Email</h1>
      <p className='text-sm text-muted-foreground'>
        Connect email addresses to receive messages automatically as tickets
      </p>

      <Card className='border-dashed border-indigo-300'>
        <CardHeader>
          <CardTitle className='text-indigo-600'>Demo mode</CardTitle>
          <CardDescription>
            Test the system without a real email setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Go to the
            <Link
              href='/tickets'
              className='text-indigo-600 font-semibold px-1 hover:underline'
            >
              Tickets page
            </Link>
            and use the
            <span className='text-indigo-600 font-semibold px-1'>
              Simulate WhatsApp message
            </span>
            button to test how incoming messages work.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected addresses</CardTitle>
          <CardDescription>
            Incoming emails to these addresses will create tickets automatically
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className='pt-4'>
          {emailAddresses.length === 0 ? (
            <div className='text-center py-10 text-sm text-muted-foreground'>
              No email addresses connected yet.
            </div>
          ) : (
            <ul className='flex flex-col divide-y'>
              {emailAddresses.map((addr) => (
                <li
                  key={addr.id}
                  className='flex items-center justify-between py-3'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                      <Mail className='size-4 text-blue-600' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold'>{addr.email}</p>
                      <p className='text-xs text-muted-foreground'>
                        Provider: {addr.provider}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      addr.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-500'
                    }
                  >
                    {addr.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

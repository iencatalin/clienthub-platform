import RoleBadge from '@/components/role-badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

export default async function MembersPage() {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    select: { organizationId: true },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const members = await prisma.organizationUser.findMany({
    where: { organizationId: orgUser.organizationId },
    select: {
      role: true,
      userId: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className='mt-4 pl-4'>
      <h1 className='text-3xl font-bold text-slate-950'>Members</h1>
      <p className='text-sm text-muted-foreground pt-1'>
        {members.length} members · Manage who has access
      </p>

      <Card className='max-w-4xl mt-4'>
        <CardHeader className='flex flex-row items-center justify-between border-b border-slate-300'>
          <div>
            <CardTitle>Team members</CardTitle>
            <CardDescription>
              Members can view and manage tickets based on their role
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className='flex flex-col divide-y'>
            {members.map((member) => (
              <li
                key={member.user.id}
                className='flex items-center justify-between py-3'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold'>
                    {member.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className='text-sm font-semibold'>{member.user.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {member.user.email}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <RoleBadge role={member.role} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className='max-w-4xl mt-4'>
        <CardHeader className='border-b border-slate-300'>
          <CardTitle>Role permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='flex flex-col gap-4 text-sm text-muted-foreground'>
            <li>
              <span className='px-2.5 py-0.5 mr-4 rounded-full text-xs font-medium border bg-indigo-50 text-indigo-700 border-indigo-200'>
                OWNER
              </span>
              Full access to everything — settings, billing, members, all
              tickets. Can delete the organization.
            </li>
            <li>
              <span className='px-2.5 py-0.5 mr-4 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200'>
                ADMIN
              </span>
              Can manage members, settings, and all tickets. Cannot delete the
              organization.
            </li>
            <li>
              <span className='px-2.5 py-0.5 mr-4 rounded-full text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200'>
                AGENT
              </span>
              Can view and respond to tickets assigned to them or their team. No
              access to settings.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

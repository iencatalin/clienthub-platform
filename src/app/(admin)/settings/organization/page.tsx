import OrganizationForm from '@/components/organization-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

export default async function OrganizationPage() {
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });

  if (!orgUser) return <div>Organization not found</div>;

  return (
    <div className='mt-4 pl-4'>
      <h1 className='text-3xl font-bold text-slate-950'>Organization</h1>
      <p className='text-sm text-muted-foreground pt-1'>
        Manage your organization details
      </p>
      <Card className='max-w-4xl mt-4'>
        <CardHeader className='border-b text-slate-400/90'>
          <CardTitle className='text-lg font-bold text-slate-950'>
            General Information
          </CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>
            Basic details about your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationForm organization={orgUser.organization} />
        </CardContent>
      </Card>
    </div>
  );
}

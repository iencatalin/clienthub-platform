import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function TicketPage({ params }: Props) {
  const { id } = await params;
  const session = await requireAuth();

  const orgUser = await prisma.organizationUser.findFirst({
    where: { userId: session.user.id },
  });

  if (!orgUser) return <div>Organization not found</div>;

  const ticket = await prisma.ticket.findFirst({
    where: { id, organizationId: orgUser.organizationId },
    include: {
      contact: true,

      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  if (!ticket) {
    notFound();
  }
  return (
    <div>
      <h1>{ticket.subject}</h1>
    </div>
  );
}

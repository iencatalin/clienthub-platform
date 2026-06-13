import { TicketStatus } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';

type Props = {
  status: TicketStatus;
};

const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; className: string }
> = {
  NEW: {
    label: 'New',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  WAITING_CLIENT: {
    label: 'Waiting',
    className: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-green-50 text-green-700 border-green-200',
  },
};

export default function TicketStatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status];
  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        config.className,
      )}
    >
      {config.label}
    </div>
  );
}

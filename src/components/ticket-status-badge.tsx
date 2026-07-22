import { TicketStatus } from '@/types';
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
    className: 'bg-blue-50 text-blue-700',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-amber-50 text-amber-700',
  },
  WAITING_CLIENT: {
    label: 'Waiting',
    className: 'bg-purple-50 text-purple-700',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-green-50 text-green-700',
  },
};

export default function TicketStatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status];
  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase transition-colors',
        config.className,
      )}
    >
      {config.label}
    </div>
  );
}

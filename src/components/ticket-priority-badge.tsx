import { TicketPriority } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';

type Props = {
  priority: TicketPriority;
};

const PRIORITY_CONFIG: Record<
  TicketPriority,
  { label: string; className: string }
> = {
  LOW: {
    label: 'LOW',
    className: 'bg-green-100/90 text-green-700',
  },
  MEDIUM: {
    label: 'MEDIUM',
    className: 'bg-amber-100/90 text-amber-700',
  },
  HIGH: {
    label: 'HIGH',
    className: 'bg-red-100/90 text-red-700',
  },
};

export default function TicketPriorityBadge({ priority }: Props) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors uppercase',
        config.className,
      )}
    >
      {config.label}
    </div>
  );
}

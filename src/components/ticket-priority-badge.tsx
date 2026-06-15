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
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  MEDIUM: {
    label: 'MEDIUM',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  HIGH: {
    label: 'HIGH',
    className: 'bg-purple-50 text-purple-700 border-purple-200',
  },
};

export default function TicketPriorityBadge({ priority }: Props) {
  const config = PRIORITY_CONFIG[priority];
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

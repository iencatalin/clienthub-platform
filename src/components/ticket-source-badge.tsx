import { TicketSource } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';

type Props = {
  source: TicketSource;
};

const SOURCE_CONFIG: Record<
  TicketSource,
  { label: string; className: string }
> = {
  WHATSAPP: {
    label: 'Whatsapp',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  EMAIL: {
    label: 'Email',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  WEB: {
    label: 'Web',
    className: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  PHONE: {
    label: 'Phone',
    className: 'bg-green-50 text-green-700 border-green-200',
  },
};

export default function TicketSourceBadge({ source }: Props) {
  const config = SOURCE_CONFIG[source];
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

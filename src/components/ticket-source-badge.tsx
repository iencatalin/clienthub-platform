import { TicketSource } from '@/types';
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
    className: 'bg-green-100 text-green-700',
  },
  EMAIL: {
    label: 'Email',
    className: 'bg-amber-50 text-amber-700',
  },
  WEB: {
    label: 'Web',
    className: 'bg-purple-50 text-purple-700',
  },
  PHONE: {
    label: 'Phone',
    className: 'bg-blue-100 text-blue-700',
  },
};

export default function TicketSourceBadge({ source }: Props) {
  const config = SOURCE_CONFIG[source];
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

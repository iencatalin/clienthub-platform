import { OrganizationRole } from '@prisma/client';
import { cn } from '@/lib/utils';

const ROLE_CONFIG: Record<
  OrganizationRole,
  { label: string; className: string }
> = {
  OWNER: {
    label: 'Owner',
    className: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  ADMIN: {
    label: 'Admin',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  AGENT: {
    label: 'Agent',
    className: 'bg-slate-50 text-slate-600 border-slate-200',
  },
};

export default function RoleBadge({ role }: { role: OrganizationRole }) {
  const config = ROLE_CONFIG[role];
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filters = [
  { label: 'All', value: '' },
  { label: 'New', value: 'NEW' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Waiting', value: 'WAITING_CLIENT' },
  { label: 'Closed', value: 'CLOSED' },
];

const dotColors = {
  '': 'bg-gray-600',
  NEW: 'bg-blue-600',
  IN_PROGRESS: 'bg-amber-600',
  WAITING_CLIENT: 'bg-indigo-600',
  CLOSED: 'bg-emerald-600',
} as const;

type Props = {
  counts: {
    all: number;
    NEW: number;
    IN_PROGRESS: number;
    WAITING_CLIENT: number;
    CLOSED: number;
  };
};

export default function TicketFilter({ counts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') ?? '';

  function handleFilter(status: string) {
    const params = new URLSearchParams(searchParams);

    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='flex flex-wrap gap-2 pt-4'>
      {filters.map((filter) => {
        const isActive = currentStatus === filter.value;

        const count =
          filter.value === ''
            ? counts.all
            : counts[filter.value as keyof typeof counts];

        return (
          <button
            key={filter.value}
            onClick={() => handleFilter(filter.value)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                dotColors[filter.value as keyof typeof dotColors]
              }`}
            />

            <span>{filter.label}</span>

            <span
              className={`ml-1 px-2 py-0.5 text-sm font-semibold ${
                isActive ? ' text-indigo-700' : ' text-slate-800'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

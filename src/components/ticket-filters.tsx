'use client';

const filters = [
  { label: 'All', value: '' },
  { label: 'New', value: 'NEW' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Waiting', value: 'WAITING_CLIENT' },
  { label: 'Closed', value: 'CLOSED' },
];

export default function TicketFilter() {
  return (
    <div className='flex flex-wrap gap-2 pt-4'>
      {filters.map((filter) => (
        <button
          key={filter.value}
          className=' 
            px-4 py-2 rounded-lg text-sm font-medium border
              bg-slate-50  text-slate-600 hover:border-indigo-700 hover:bg-indigo-50 transition duration-200'
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

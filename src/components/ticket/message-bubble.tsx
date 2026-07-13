import { Message } from '@/generated/prisma/browser';

import clsx from 'clsx';

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  const incoming = message.direction === 'INBOUND';

  return (
    <div className={clsx('flex', incoming ? 'justify-start' : 'justify-end')}>
      <div
        className={clsx(
          'max-w-md rounded-lg px-4 py-3',
          incoming ? 'bg-slate-100' : 'bg-blue-600 text-white',
        )}
      >
        <p>{message.body}</p>

        <time className='mt-2 block text-xs opacity-70'>
          {message.createdAt.toLocaleString('ro-RO')}
        </time>
      </div>
    </div>
  );
}

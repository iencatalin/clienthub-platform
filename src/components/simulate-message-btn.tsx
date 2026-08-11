'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SimulateMessageForm } from './simulate-message-form';

export function SimulateMessageBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant='outline'>
        <MessageSquare className='mr-2 size-4' />
        Simulate incoming message
      </Button>

      <SimulateMessageForm open={open} onClose={() => setOpen(false)} />
    </>
  );
}

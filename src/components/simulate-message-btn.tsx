'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { SimulateMessageForm } from './simulate-message-form';

export function SimulateMessageBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className='bg-green-500 text-slate-50 hover:bg-green-600 hover:text-slate-50'
      >
        <MessageSquare className='size-4 mr-2' />
        Simulate message
      </Button>

      <SimulateMessageForm open={open} onClose={() => setOpen(false)} />
    </>
  );
}

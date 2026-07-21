'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TicketStatus, TicketPriority } from '@/types';
import {
  updateTicketStatusAction,
  updateTicketPriorityAction,
  closeTicketAction,
} from '@/app/actions/ticket';
import { toast } from 'sonner';
import { UserIcon } from 'lucide-react';

type Props = {
  ticketId: string;
  status: TicketStatus;
  priority: TicketPriority;
};

export function TicketActions({ ticketId, status }: Props) {
  const handleClose = async () => {
    await closeTicketAction(ticketId);
    toast.success('Ticket closed');
  };

  return (
    <div className='flex gap-2'>
      <Button className='bg-neutral-50 text-slate-800 hover:bg-neutral-100'>
        <UserIcon className='w-4 h-4' /> Assign
      </Button>
      {status !== 'CLOSED' && (
        <Button
          onClick={handleClose}
          className='bg-linear-to-r from-blue-600 to-purple-500 text-slate-50'
        >
          Close Ticket
        </Button>
      )}
    </div>
  );
}

export function TicketStatusSelect({
  ticketId,
  status,
}: {
  ticketId: string;
  status: TicketStatus;
}) {
  const handleChange = async (value: string) => {
    await updateTicketStatusAction(ticketId, value as TicketStatus);
    toast.success('Status updated');
  };

  return (
    <Select defaultValue={status} onValueChange={handleChange}>
      <SelectTrigger className='w-full h-7 text-xs'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='NEW'>New</SelectItem>
        <SelectItem value='IN_PROGRESS'>In Progress</SelectItem>
        <SelectItem value='WAITING_CLIENT'>Waiting</SelectItem>
        <SelectItem value='CLOSED'>Closed</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function TicketPrioritySelect({
  ticketId,
  priority,
}: {
  ticketId: string;
  priority: TicketPriority;
}) {
  const handleChange = async (value: string) => {
    await updateTicketPriorityAction(ticketId, value as TicketPriority);
    toast.success('Priority updated');
  };

  return (
    <Select defaultValue={priority} onValueChange={handleChange}>
      <SelectTrigger className='w-full h-7 text-xs'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='LOW'>Low</SelectItem>
        <SelectItem value='MEDIUM'>Medium</SelectItem>
        <SelectItem value='HIGH'>High</SelectItem>
      </SelectContent>
    </Select>
  );
}

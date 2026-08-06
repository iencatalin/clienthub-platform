// components/ticket/reply-form.tsx
'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { sendReplyAction } from '@/app/actions/ticket';
import { Send } from 'lucide-react';

type Props = {
  ticketId: string;
  currentStatus: string;
};

export function ReplyForm({ ticketId, currentStatus }: Props) {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!body.trim()) return;

    setLoading(true);
    const result = await sendReplyAction(ticketId, body, currentStatus);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Reply sent!');
      setBody('');
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col gap-2 border-t pt-4'>
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='Type your reply...'
        className='bg-slate-50 resize-none'
        rows={3}
      />
      <div className='flex justify-end'>
        <Button
          onClick={handleSubmit}
          disabled={loading || !body.trim()}
          className='bg-linear-to-r from-blue-600 to-purple-500 text-white'
        >
          <Send className='size-4 mr-2' />
          {loading ? 'Sending...' : 'Send reply'}
        </Button>
      </div>
    </div>
  );
}

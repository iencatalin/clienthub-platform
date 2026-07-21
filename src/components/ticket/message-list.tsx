import { Message } from '@/types';
import MessageBubble from './message-bubble';

type Props = {
  messages: Message[];
};

export default function MessageList({ messages }: Props) {
  if (!messages.length) {
    return (
      <div className='text-center text-sm text-muted-foreground py-12'>
        No messages yet.
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}

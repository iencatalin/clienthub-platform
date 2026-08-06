import { Message, TicketSource } from '@/types';
import ConversationEmpty from './conversation-empty';
import MessageList from './message-list';
import { ReplyForm } from './reply-form';

type ConversationProps = {
  ticketId: string;
  source: TicketSource;
  messages: Message[];
  currentStatus: string;
};

export default function Conversation({
  ticketId,
  source,
  messages,
  currentStatus,
}: ConversationProps) {
  const hasConversation = source === 'WHATSAPP';

  if (!hasConversation) {
    return <ConversationEmpty />;
  }

  return (
    <>
      <MessageList messages={messages} />
      <div>
        <ReplyForm ticketId={ticketId} currentStatus={currentStatus} />
      </div>
    </>
  );
}

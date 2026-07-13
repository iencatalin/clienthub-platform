import { Message, TicketSource } from '@/generated/prisma/browser';
import ConversationEmpty from './conversation-empty';
import MessageList from './message-list';

type ConversationProps = {
  source: TicketSource;
  messages: Message[];
};

export default function Conversation({ source, messages }: ConversationProps) {
  const hasConversation = source === 'WHATSAPP' || source === 'EMAIL';

  if (!hasConversation) {
    return <ConversationEmpty />;
  }

  return <MessageList messages={messages} />;
}

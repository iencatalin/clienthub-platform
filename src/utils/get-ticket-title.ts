type TicketTitle = {
  subject: string | null;
  messages: {
    body: string;
  }[];
};

export function getTicketTitle(ticket: TicketTitle) {
  if (ticket.subject) return ticket.subject;

  const firstMessage = ticket.messages[0]?.body;

  if (!firstMessage) return 'No subject';

  return firstMessage.length > 60
    ? `${firstMessage.slice(0, 60)}...`
    : firstMessage;
}

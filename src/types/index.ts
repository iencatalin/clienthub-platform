export type { Message } from '@prisma/client';
export { TicketSource } from '@prisma/client';
export { TicketStatus } from '@prisma/client';
export { TicketPriority } from '@prisma/client';

export type Contact = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
};

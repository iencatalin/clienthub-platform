export type { Message } from '@prisma/client';
export type { TicketSource } from '@prisma/client';
export type { TicketStatus } from '@prisma/client';
export type { TicketPriority } from '@prisma/client';

export type Contact = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
};

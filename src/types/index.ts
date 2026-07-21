export type { Message } from '@/generated/prisma/client';
export type { TicketSource } from '@/generated/prisma/enums';
export type { TicketStatus } from '@/generated/prisma/enums';
export type { TicketPriority } from '@/generated/prisma/enums';

export type Contact = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
};

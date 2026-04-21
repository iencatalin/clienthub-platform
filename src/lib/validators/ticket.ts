import z from 'zod';

export const createTicketManualSchema = z.object({
  source: z.enum(['WEB', 'PHONE']),
  contactId: z.string().min(1, 'Contact is required'),
  subject: z.string().min(1, 'Subject is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),

  assignedToId: z.string().optional(),
  internalNotes: z.string().optional(),
});

export type CreateTicketFormValues = z.infer<typeof createTicketManualSchema>;

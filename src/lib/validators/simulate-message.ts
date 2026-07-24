import z from 'zod';

export const createSimulateMessageSchema = z.object({
  source: z.enum(['WHATSAPP']),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

export type CreateSimulateMessageFormValues = z.infer<
  typeof createSimulateMessageSchema
>;

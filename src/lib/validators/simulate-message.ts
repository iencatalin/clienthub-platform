import { z } from 'zod';

export const createSimulateMessageSchema = z.object({
  source: z.literal('WHATSAPP'),

  name: z
    .string()
    .trim()
    .min(1, 'Customer name is required')
    .max(100, 'Name is too long'),

  phone: z
    .string()
    .trim()
    .min(8, 'Phone number is required')
    .max(20, 'Invalid phone number'),

  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(5000, 'Message is too long'),
});

export type CreateSimulateMessageFormValues = z.infer<
  typeof createSimulateMessageSchema
>;

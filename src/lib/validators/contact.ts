import z from 'zod';

export const createContactSchema = z
  .object({
    name: z.string().optional(),
    email: z.email().optional(),
    phone: z.string().min(7).max(20).optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: 'email or phone is required',
  });

export type CreateContactFormValues = z.infer<typeof createContactSchema>;

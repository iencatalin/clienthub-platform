import z from 'zod';

export const organizationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  type: z.enum(['INDIVIDUAL', 'COMPANY']),
  cui: z.string().optional(),
  regCom: z.string().optional(),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;

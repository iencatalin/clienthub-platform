import z from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
    organizationName: z.string().min(2, 'Organization name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don`t match',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

import z from 'zod';
import { passwordRules } from '../password-rules';

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.email(),
    password: z
      .string()
      .min(passwordRules.minLength, `Min ${passwordRules.minLength} characters`)
      .regex(passwordRules.uppercase, 'One uppercase letter required')
      .regex(passwordRules.lowercase, 'One lowercase letter required')
      .regex(passwordRules.number, 'One number required')
      .regex(passwordRules.special, 'One special character required'),
    confirmPassword: z
      .string()
      .min(
        passwordRules.minLength,
        `Min ${passwordRules.minLength} characters`,
      ),
    organizationName: z.string().min(2, 'Organization name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don`t match',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

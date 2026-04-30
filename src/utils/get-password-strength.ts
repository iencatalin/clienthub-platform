import { passwordRules } from '@/lib/password-rules';

export function getPasswordStrength(password: string = '') {
  let score = 0;

  if (password.length >= passwordRules.minLength) score++;
  if (passwordRules.uppercase.test(password)) score++;
  if (passwordRules.lowercase.test(password)) score++;
  if (passwordRules.number.test(password)) score++;
  if (passwordRules.special.test(password)) score++;

  const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];

  return {
    score,
    label: labels[score - 1] || 'Very Weak',
  };
}

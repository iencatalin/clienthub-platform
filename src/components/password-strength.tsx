'use client';

import { passwordRules } from '@/lib/password-rules';
import { getPasswordStrength } from '@/utils/get-password-strength';

type Props = {
  password?: string;
};

export default function PasswordStrength({ password }: Props) {
  const safePassword = password ?? '';

  if (!safePassword) return null;

  const { score, label } = getPasswordStrength(safePassword);

  const width = `${(score / 5) * 100}%`;

  const colors = [
    'bg-red-500',
    'bg-red-400',
    'bg-yellow-400',
    'bg-blue-500',
    'bg-green-500',
  ];

  const checks = {
    length: safePassword.length >= passwordRules.minLength,
    uppercase: passwordRules.uppercase.test(safePassword),
    lowercase: passwordRules.lowercase.test(safePassword),
    number: passwordRules.number.test(safePassword),
    special: passwordRules.special.test(safePassword),
  };

  return (
    <div className='mt-3'>
      <div className='h-2 w-full bg-gray-200 rounded'>
        <div
          className={`h-2 rounded transition-all duration-300 ${
            colors[score - 1] || 'bg-gray-300'
          }`}
          style={{ width }}
        />
      </div>

      <p className='mt-2 text-sm'>{label}</p>

      <ul className='mt-3 text-sm space-y-1'>
        <li className={checks.length ? 'text-green-500' : 'text-gray-400'}>
          • At least 8 characters
        </li>
        <li className={checks.uppercase ? 'text-green-500' : 'text-gray-400'}>
          • One uppercase letter
        </li>
        <li className={checks.lowercase ? 'text-green-500' : 'text-gray-400'}>
          • One lowercase letter
        </li>
        <li className={checks.number ? 'text-green-500' : 'text-gray-400'}>
          • One number
        </li>
        <li className={checks.special ? 'text-green-500' : 'text-gray-400'}>
          • One special character
        </li>
      </ul>
    </div>
  );
}

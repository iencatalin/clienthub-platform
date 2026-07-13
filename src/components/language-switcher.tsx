'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();

  const pathname = usePathname();
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  function switchLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, {
        locale: nextLocale,
      });
    });
  }

  return (
    <div className='flex items-center  gap-2 text-sm '>
      <button
        onClick={() => switchLocale('ro')}
        className={cn(
          'rounded-md px-2 py-1 transition',
          locale === 'ro'
            ? 'bg-linear-to-r from-blue-600 to-purple-500 text-white'
            : 'text-slate-500 hover:bg-slate-100',
        )}
        disabled={pending || locale === 'ro'}
      >
        RO
      </button>
      <span className='text-slate-300'>|</span>
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'rounded-md px-2 py-1 transition',
          locale === 'en'
            ? 'bg-linear-to-r from-blue-600 to-purple-500 text-white'
            : 'text-slate-500 hover:bg-slate-100',
        )}
        disabled={pending || locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}

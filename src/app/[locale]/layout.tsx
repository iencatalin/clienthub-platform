import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/sonner';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <Toaster position='top-center' />
    </NextIntlClientProvider>
  );
}

import BannerSection from '@/components/landingpage/banner-section';
import CtaSection from '@/components/landingpage/cta-section';
import FAQSection from '@/components/landingpage/faq-section';
import FeaturesSection from '@/components/landingpage/features-section';
import Footer from '@/components/landingpage/footer';
import HeroSection from '@/components/landingpage/hero-section';
import HowSection from '@/components/landingpage/how-section';
import { LanguageSwitcher } from '@/components/language-switcher';

import { auth } from '@/lib/auth';
import { CheckCircleIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

import { Link } from '@/i18n/navigation';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }
  const t = await getTranslations();

  return (
    <>
      <header className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100'>
        <nav className='flex justify-between items-center mx-auto max-w-7xl px-4 py-4'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 flex items-center justify-center shadow-lg bg-linear-to-r from-blue-600 to-purple-500 rounded-xl'>
              <CheckCircleIcon className='w-5 h-5 text-white' />
            </div>
            <div>
              <span className='md:text-lg text-sm font-bold text-slate-800'>
                Revelio ClientHub
              </span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Link
              href='/sign-in'
              className='hidden md:block bg-slate-50 px-5 py-2 rounded-lg text-slate-900 ring-1 ring-slate-300 text-xs md:text-sm hover:bg-slate-100 transition'
            >
              {t('LandingPage.login')}
            </Link>
            <Link
              href='/sign-up'
              className='hidden md:block bg-linear-to-r from-blue-600 to-purple-500 px-5 py-2 rounded-lg text-white text-xs md:text-sm shadow-lg hover:-translate-y-px duration-200 transition'
            >
              {t('LandingPage.startFree')}
            </Link>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
      <main>
        <HeroSection />
        <HowSection />
        <FeaturesSection />
        <BannerSection />
        <FAQSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

import BannerSection from '@/components/landingpage/banner-section';
import CtaSection from '@/components/landingpage/cta-section';
import FAQSection from '@/components/landingpage/faq-section';
import FeaturesSection from '@/components/landingpage/features-section';
import Footer from '@/components/landingpage/footer';
import HeroSection from '@/components/landingpage/hero-section';
import HowSection from '@/components/landingpage/how-section';

import { auth } from '@/lib/auth';
import { CheckCircleIcon } from 'lucide-react';
import { headers } from 'next/headers';

import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }
  return (
    <>
      <header>
        <nav className='flex justify-between items-center mx-auto py-4 max-w-7xl'>
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
              className='bg-slate-50 px-5 py-2 rounded-lg text-slate-900 outline-slate-400 outline text-sm shadow-lg hover:bg-slate-100 hover:-translate-y-px duration-200 transition'
            >
              Login
            </Link>
            <Link
              href='/sign-up'
              className='bg-linear-to-r from-blue-600 to-purple-500 px-5 py-2 rounded-lg text-white text-sm hover:-translate-y-px duration-200 shadow-lg transition'
            >
              Începe gratuit
            </Link>
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

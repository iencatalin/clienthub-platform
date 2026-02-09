import HeroSection from '@/components/HeroSection';
import { auth } from '@/lib/auth';
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
        <nav className='flex justify-between items-center mx-auto py-4 max-w-6xl'>
          <div>
            <h1 className='text-2xl font-bold text-slate-950'>
              Revelio ClientHub
            </h1>
          </div>

          <div>
            <Link
              href='/signin'
              className='bg-slate-800 px-5 py-2 rounded-lg text-white text-sm hover:bg-slate-900 duration-200 transition'
            >
              Login
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <HeroSection />
      </main>
      <footer className='text-center text-gray-900 font-semibold text-sm py-6'>
        © ClientHub {new Date().getFullYear()}
      </footer>
    </>
  );
}

import SignUpForm from '@/components/signup-form';
import { requireNoAuth } from '@/lib/auth-utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function SignUpPage() {
  await requireNoAuth();
  return (
    <>
      <div className='relative hidden bg-linear-to-tr from-purple-600 to-blue-500 lg:block'>
        <div className='absolute inset-0 bg-black/10'></div>
        <Link
          href='/'
          className='flex items-center gap-2 text-lg font-semibold text-white absolute top-6 left-10'
        >
          Revelio ClientHub
        </Link>
        <div className='flex items-center justify-center h-full'>
          <Image
            src='/img.svg'
            alt='Abstract client workflow illustration'
            width={400}
            height={400}
            className='w-full max-w-md h-auto object-contain drop-shadow-xl'
          />
        </div>

        <div className='absolute bottom-16 left-10 max-w-md space-y-2'>
          <h2 className='text-white text-3xl font-bold'>Start in</h2>
          <h3 className='text-white text-3xl font-bold'>minutes.</h3>
          <p className='text-white/80 text-sm'>
            Create your workspace and start managing client requests right away.
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-4 p-6'>
        <div className='flex flex-1 items-center justify-center lg:justify-start lg:pl-10'>
          <div className='w-full max-w-sm md:max-w-full'>
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
}

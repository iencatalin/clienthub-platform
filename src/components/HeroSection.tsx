import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='relative max-w-8xl mx-auto mt-8 px-6'>
      <div className='relative overflow-hidden rounded-3xl bg-white shadow-xl'>
        <div className='relative px-12 py-28 text-center'>
          <h1 className='text-5xl md:text-6xl font-semibold tracking-tight'>
            Keep client requests
            <br />
            <span className='text-gray-500 font-medium'>
              from WhatsApp in one place
            </span>
          </h1>

          <p className='mt-6 text-lg text-gray-600 max-w-xl mx-auto'>
            Organize messages, requests and documents without losing context.
          </p>

          <button className='mt-8 bg-slate-900 text-slate-50 px-6 py-2 rounded-lg font-medium hover:bg-slate-800 hover:-translate-y-px shadow-lg transition'>
            <Link href='/sign-up'>Request access</Link>
          </button>
        </div>
        <div className='absolute left-8 top-20 hidden md:block'></div>

        <div className='absolute right-10 top-24 hidden md:block'>
          <div className='bg-white/50 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/40 rotate-3 max-w-xs'>
            <p className='text-sm text-gray-700'>
              Hi, I need help with
              <br /> the documents by Friday
            </p>
          </div>
        </div>
        <div className='absolute right-8 bottom-10 hidden md:block'>
          <div className='bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/40 rotate-[-4deg]'></div>
        </div>
      </div>
    </section>
  );
}

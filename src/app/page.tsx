import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <header>
        <nav className='bg-slate-50 flex justify-between items-center mx-auto py-4'>
          <div>
            <h1 className='text-2xl font-bold text-slate-950'>
              Revelio ClientHub
            </h1>
          </div>
          <ul className='flex justify-between items-center gap-6'>
            <li>Features</li>
            <li>Solutions</li>
            <li>Pricing</li>
          </ul>
          <div>
            <Link href={'/'}>Login</Link>
          </div>
        </nav>
      </header>
      <main>
        <section></section>
        <section></section>
        <section></section>
      </main>
      <footer></footer>
    </>
  );
}

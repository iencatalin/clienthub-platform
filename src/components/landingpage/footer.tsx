import Link from 'next/link';
import { Separator } from '../ui/separator';

export default function Footer() {
  return (
    <footer className='text-center bg-slate-900 text-amber-50 space-y-4 py-10'>
      <ul className='flex md:flex-row flex-col items-center md:items-start justify-between text-sm max-w-6xl mx-auto pb-6'>
        <li>
          <ul className='text-center md:text-left'>
            <p className='font-bold text-base'>Revelio ClientHub</p>
            <p className='text-slate-400/90 mx-auto max-w-xs text-sm pt-4'>
              Simple ticket management for small teams dealing with high volumes
              of client requests.
            </p>
          </ul>
        </li>
        <li>
          <ul className='space-y-4 text-left'>
            <li className='text-slate-400 uppercase text-xs font-semibold tracking-wide'>
              Produs
            </li>
            <li>
              <Link
                href='/features'
                className='hover:text-slate-400 transition-colors'
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href='/faq'
                className='hover:text-slate-400 transition-colors'
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href='/integrations'
                className='hover:text-slate-400 transition-colors'
              >
                Integrations
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <ul className='space-y-4 text-left'>
            <li className='text-slate-400 uppercase text-xs font-semibold tracking-wide'>
              Company
            </li>
            <li>
              <Link
                href='/contact'
                className='hover:text-slate-400 transition-colors'
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href='/about'
                className='hover:text-slate-400 transition-colors'
              >
                About
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <ul className='space-y-4 text-left'>
            <li className='text-slate-400 uppercase text-xs font-semibold tracking-wide'>
              Legal
            </li>
            <li>
              <Link
                href='/terms'
                className='hover:text-slate-400 transition-colors'
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href='/privacy'
                className='hover:text-slate-400 transition-colors'
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href='/gdpr'
                className='hover:text-slate-400 transition-colors'
              >
                GDPR
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <Separator className='my-4 max-w-6xl mx-auto bg-slate-400/60' />
      <div className='text-slate-400/90'>
        © ClientHub {new Date().getFullYear()}
      </div>
    </footer>
  );
}

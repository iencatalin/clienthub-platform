import { Link } from '@/i18n/navigation';
import { Separator } from '../ui/separator';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('LandingPage.footer');
  return (
    <footer className='text-center bg-slate-900 text-amber-50 space-y-4 py-10'>
      <ul className='flex md:flex-row flex-col items-center md:items-start justify-between text-sm max-w-6xl mx-auto pb-6'>
        <li>
          <ul className='text-center md:text-left'>
            <p className='font-bold text-base'>Revelio ClientHub</p>
            <p className='text-slate-400/90 mx-auto max-w-xs text-sm pt-4'>
              {t('description')}
            </p>
          </ul>
        </li>
        <li>
          <ul className='space-y-4 text-center md:text-left'>
            <li className='text-slate-400 uppercase pt-4 text-xs font-semibold tracking-wide'>
              {t('product')}
            </li>
            <li>
              <Link
                href='/features'
                className='hover:text-slate-400 transition-colors'
              >
                {t('features')}
              </Link>
            </li>
            <li>
              <Link
                href='/faq'
                className='hover:text-slate-400 transition-colors'
              >
                {t('faq')}
              </Link>
            </li>
            <li>
              <Link
                href='/integrations'
                className='hover:text-slate-400 transition-colors'
              >
                {t('integrations')}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <ul className='space-y-4 text-center md:text-left'>
            <li className='text-slate-400 uppercase pt-4 text-xs font-semibold tracking-wide'>
              {t('company')}
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
                {t('about')}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <ul className='space-y-4 text-center md:text-left'>
            <li className='text-slate-400 uppercase pt-4 text-xs font-semibold tracking-wide'>
              {t('legal')}
            </li>
            <li>
              <Link
                href='/terms'
                className='hover:text-slate-400 transition-colors'
              >
                {t('terms')}
              </Link>
            </li>
            <li>
              <Link
                href='/privacy'
                className='hover:text-slate-400 transition-colors'
              >
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link
                href='/gdpr'
                className='hover:text-slate-400 transition-colors'
              >
                {t('gdpr')}
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

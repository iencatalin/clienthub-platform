import { useTranslations } from 'next-intl';
import { Card, CardContent } from '../ui/card';

export default function BannerSection() {
  const t = useTranslations('LandingPage.banner');
  return (
    <section className='bg-linear-to-tr from-blue-600 to-60% to-purple-500 text-slate-100'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-8 md:py-20'>
        <div className='text-center md:text-left md:pr-10'>
          <p className='font-bold text-2xl'>{t('title')}</p>
          <p className='text-slate-200/70 text-sm pt-2'>{t('description')}</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 p-4 md:p-0'>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>0</div>
              <div className='text-slate-200/70 text-sm'>{t('missed')}</div>
            </CardContent>
          </Card>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>-65%</div>
              <div className='text-slate-200/70 text-sm'>{t('response')}</div>
            </CardContent>
          </Card>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>5 min</div>
              <div className='text-slate-200/70 text-sm'>{t('setup')}</div>
            </CardContent>
          </Card>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>100%</div>
              <div className='text-slate-200/70 text-sm'>{t('free')}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

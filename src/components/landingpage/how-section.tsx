import { useTranslations } from 'next-intl';
import { Card, CardContent } from '../ui/card';

export default function HowSection() {
  const t = useTranslations('LandingPage.how');
  return (
    <section id='how-section' className='p-6 md:p-16'>
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-2xl space-y-4 md:space-y-6'>
          <p className='text-blue-400 text-sm font-semibold uppercase tracking-wide'>
            {t('title')}
          </p>

          <h2 className='text-3xl md:text-5xl font-semibold'>
            {t('subtitle')}
          </h2>

          <p className='text-muted-foreground max-w-md'>{t('description')}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-5 md:pt-10'>
          <Card className='relative overflow-hidden'>
            <div className='bg-red-500 w-full h-1 absolute top-0 rounded-md'></div>
            <CardContent>
              <div className='text-2xl font-semibold bg-red-200 text-red-700 px-4 py-1 rounded-lg w-fit'>
                1
              </div>
              <h3 className='font-semibold text-base py-2'>
                {t('step1Title')}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {t('step1Description')}
              </p>
            </CardContent>
          </Card>
          <Card className='relative overflow-hidden'>
            <div className='bg-sky-500 w-full h-1 absolute top-0 rounded-md'></div>
            <CardContent>
              <div className='text-2xl font-semibold bg-sky-200 text-sky-700 px-4 py-1 rounded-lg w-fit'>
                2
              </div>
              <h3 className='font-semibold text-base py-2'>
                {t('step2Title')}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {t('step2Description')}
              </p>
            </CardContent>
          </Card>
          <Card className='relative overflow-hidden'>
            <div className='bg-emerald-500 w-full h-1 absolute top-0 rounded-md'></div>
            <CardContent>
              <div className='text-2xl font-semibold bg-emerald-200 text-emerald-700 px-4 py-1 rounded-lg w-fit'>
                3
              </div>
              <h3 className='font-semibold text-base py-2'>
                {t('step3Title')}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {t('step3Description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

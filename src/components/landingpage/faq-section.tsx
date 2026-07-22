import { FileQuestion } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useTranslations } from 'next-intl';

export default function FAQSection() {
  const t = useTranslations('LandingPage.faq');
  return (
    <section className='bg-section'>
      <div className='max-w-7xl mx-auto space-y-4 md:space-y-6'>
        <p className='text-blue-400 text-sm font-semibold uppercase tracking-wide'>
          FAQ
        </p>
        <h2 className='text-3xl md:text-5xl font-semibold'>{t('title')}</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-6'>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                {t('q1')}
              </CardTitle>
              <CardDescription>{t('a1')}</CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                {t('q2')}
              </CardTitle>
              <CardDescription>{t('a2')}</CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                {t('q3')}
              </CardTitle>
              <CardDescription>{t('a3')}</CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                {t('q4')}
              </CardTitle>
              <CardDescription>{t('a4')}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

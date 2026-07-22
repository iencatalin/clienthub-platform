import { Link } from '@/i18n/navigation';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useTranslations } from 'next-intl';

export default function CtaSection() {
  const t = useTranslations('LandingPage.cta');
  return (
    <section className='bg-section'>
      <div className='max-w-7xl mx-auto space-y-2 md:space-y-6'>
        <Card className='relative overflow-hidden max-w-2xl mx-auto'>
          <div className='bg-indigo-500 w-full h-1.5 absolute top-0 rounded-md'></div>
          <CardHeader className='text-center space-y-2 p-5 md:p-10'>
            <CardTitle className='text-xl md:text-3xl font-bold'>
              {t('title')}
            </CardTitle>
            <CardDescription className='text-slate-500 mx-auto max-w-md'>
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center items-center'>
            <CardAction>
              <Link
                href='/sign-up'
                className='bg-linear-to-r from-blue-600 to-purple-500 px-5 py-2 rounded-lg text-white text-lg md:text-xl hover:shadow-lg transition'
              >
                {t('button')}
              </Link>
            </CardAction>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

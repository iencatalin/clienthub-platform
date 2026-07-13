import {
  ArrowDown,
  ArrowRight,
  Clock,
  Dot,
  MessageSquareDot,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('LandingPage.hero');
  return (
    <section className='bg-section'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
        <div>
          <Badge
            variant='outline'
            className='hidden md:inline-flex items-center gap-1 bg-slate-50 text-purple-500 p-2'
          >
            <Dot aria-hidden='true' />
            {t('badge')}
          </Badge>
          <h1 className='text-3xl md:text-5xl text-black font-semibold mt-3 md:mt-5'>
            {t('title')} <br />
            <span className='text-blue-600 underline'>{t('highlight')}</span>
          </h1>
          <p className='pt-8 text-slate-500/90 leading-loose max-w-lg text-sm md:text-lg'>
            {t('description')}
          </p>
          <div className='mt-10 flex items-center gap-3'>
            <Link
              href='/sign-up'
              className='bg-linear-to-r from-blue-600 to-purple-500 px-3 md:px-6 py-3 rounded-lg text-white text-sm shadow-lg hover:-translate-y-px duration-200 transition'
            >
              {t('createAccount')}
            </Link>
            <Button
              variant='outline'
              className='h-10 px-4 text-sm md:h-12 md:px-6 md:text-base bg-slate-50'
              asChild
            >
              <a href='#how-section'>
                {t('howItWorks')} <ArrowRight aria-hidden='true' />
              </a>
            </Button>
          </div>
        </div>
        <div>
          <Card>
            <CardContent>
              <div className='flex items-center py-5'>
                <MessageSquareDot
                  aria-hidden='true'
                  className='text-green-500 size-4'
                />
                <p className='uppercase font-semibold text-sm text-muted-foreground/60 ml-2'>
                  {t('incomingMessage')}
                </p>
              </div>
              <div className='bg-slate-100/50 max-w-xs md:max-w-sm p-3 rounded-bl-none rounded-md shadow-md outline outline-slate-300'>
                <p className='text-sm text-slate-900'>
                  Bună ziua, am nevoie de bilanțul pe 2026 până vineri Ionescu
                  &Asociații
                </p>
                <p className='text-sm text-muted-foreground'>09:42 </p>
              </div>
              <div className='bg-slate-100/50 max-w-xs md:max-w-sm mt-3 p-3 rounded-bl-none rounded-md shadow-md outline outline-slate-300'>
                <p className='text-sm text-slate-900'>
                  Și dacă se poate și declarația 394
                </p>
                <p className='text-sm text-muted-foreground'>09:43 </p>
              </div>
            </CardContent>
          </Card>
          <div className='flex items-center justify-center gap-3 text-indigo-700 py-4'>
            <div className='ac-line'></div>
            <div className='flex items-center gap-1'>
              <ArrowDown aria-hidden='true' className='size-4 mt-1' />
              <p className='font-semibold text-sm'>{t('autoConverted')}</p>
            </div>
            <div className='ac-line'></div>
          </div>
          <Card className='relative overflow-hidden'>
            <div className='absolute flex justify-between bg-indigo-200/60 text-indigo-600 w-full top-0 py-2 px-5 text-xs font-medium border-b border-indigo-600'>
              {t('ticketCreated')}
              <span className='font-semibold text-xs'>{t('justNow')}</span>
            </div>
            <CardHeader>
              <CardTitle className='pt-4'>Ionescu & Partners</CardTitle>
              <CardDescription>{t('annualReport')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-2'>
                <Badge className='bg-blue-100 text-blue-700 border border-blue-600 rounded-md'>
                  {t('new')}
                </Badge>
                <Badge className='bg-red-100 text-red-700 border border-red-600 rounded-md'>
                  {t('high')}
                </Badge>
                <Badge className='bg-green-100 text-green-700  rounded-md'>
                  {t('email')}
                </Badge>
                <Badge className='bg-sky-100 text-sky-700 rounded-md'>
                  <Clock className='size-4' />
                  {t('minutesAgo')}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className='mt-5'>
            <CardContent>
              <div className='flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-12 gap-4'>
                <div className='flex flex-col items-center gap-1'>
                  <span className='font-medium text-2xl text-rose-700'>
                    120
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    {t('totalTickets')}
                  </span>
                </div>

                <div className='flex flex-col items-center gap-1'>
                  <span className='font-medium text-2xl text-emerald-500'>
                    98%
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    {t('responseRate')}
                  </span>
                </div>

                <div className='flex flex-col items-center gap-1'>
                  <span className='font-medium text-2xl text-amber-700'>
                    1.4h
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    {t('avgResponse')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

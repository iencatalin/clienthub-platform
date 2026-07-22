import { useTranslations } from 'next-intl';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function FeaturesSection() {
  const t = useTranslations('LandingPage.features');
  return (
    <section className='bg-section'>
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
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-10'>
          <Card>
            <CardHeader className='space-y-2 px-4'>
              <div className='text-2xl bg-blue-100 w-fit p-1 rounded-md'>
                📬
              </div>

              <CardTitle>{t('ticketCreation')}</CardTitle>

              <CardDescription>{t('ticketCreationDesc')}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className='flex gap-2 flex-wrap'>
                <Badge className='bg-blue-100 text-blue-700 rounded-md'>
                  Multi-channel
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='space-y-2 px-4'>
              <div className='text-2xl bg-emerald-100 w-fit p-1 rounded-md'>
                📊
              </div>

              <CardTitle>{t('liveDashboard')}</CardTitle>

              <CardDescription className='text-sm leading-tight'>
                {t('liveDashboardDesc')}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className='flex gap-2 flex-wrap'>
                <Badge className='bg-emerald-100 text-emerald-700 rounded-md'>
                  Analictics
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='space-y-2 px-4'>
              <div className='text-2xl bg-amber-100 w-fit p-1 rounded-md'>
                🗂️
              </div>

              <CardTitle>{t('history')}</CardTitle>

              <CardDescription className='text-sm'>
                {t('historyDesc')}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className='flex gap-2 flex-wrap'>
                <Badge className='bg-amber-100 text-amber-700 rounded-md'>
                  CRM lite
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='space-y-2 px-4'>
              <div className='text-2xl bg-red-100 w-fit p-1 rounded-md'>👥</div>

              <CardTitle>{t('team')}</CardTitle>

              <CardDescription>{t('teamDesc')}</CardDescription>
            </CardHeader>

            <CardContent className='px-4'>
              <div className='flex gap-2 flex-wrap'>
                <Badge className='bg-red-100 text-red-700 rounded-md'>
                  Multi-agent
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='space-y-2 px-4'>
              <div className='bg-orange-100 w-fit p-1 rounded-md text-2xl'>
                ⚡
              </div>

              <CardTitle>{t('reply')}</CardTitle>

              <CardDescription>{t('replyDesc')}</CardDescription>
            </CardHeader>

            <CardContent className='px-4'>
              <div className='flex gap-2 flex-wrap'>
                <Badge className='bg-orange-100 text-orange-700 rounded-md'>
                  Omnichannel
                </Badge>
              </div>
            </CardContent>
          </Card>{' '}
          <Card>
            <CardHeader className='space-y-2 px-4'>
              <div className='bg-sky-100 p-1 rounded-md w-fit text-2xl'>🏷️</div>

              <CardTitle>{t('tags')}</CardTitle>

              <CardDescription>{t('tagsDesc')}</CardDescription>
            </CardHeader>

            <CardContent className='px-4'>
              <div className='flex gap-2 flex-wrap'>
                <Badge className='bg-sky-100 text-sky-700 rounded-md'>
                  Organization
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

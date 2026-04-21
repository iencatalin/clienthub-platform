import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { requireAuth } from '@/lib/auth-utils';

import {
  ArrowRight,
  CheckCircle,
  FolderOpen,
  List,
  MessageCircle,
  Ticket,
} from 'lucide-react';

export default async function DashboardPage() {
  await requireAuth();
  return (
    <div className='pt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <Card className='relative overflow-hidden p-6'>
          <div className='absolute inset-0 bg-linear-to-br from-purple-100 via-transparent to-transparent' />

          <div className='absolute -top-10 -right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-40' />

          <div className='relative z-10'>
            <CardHeader className='p-0 mb-2'>
              <CardTitle className='flex justify-between items-center'>
                Total tickets <Ticket className='text-purple-400' />
              </CardTitle>
            </CardHeader>

            <CardContent className='p-0'>
              <p className='text-3xl font-semibold'>146</p>
            </CardContent>

            <CardFooter className='p-0 mt-2'>
              <Badge className='text-sm font-bold bg-green-300/30 text-green-700 rounded-md'>
                17%
              </Badge>
              <p className='pl-2 text-slate-600 text-sm'>fata de ieri</p>
            </CardFooter>
          </div>
        </Card>
        <Card className='relative overflow-hidden p-6'>
          <div className='absolute inset-0 bg-linear-to-br from-amber-100 via-transparent to-transparent' />

          <div className='absolute -top-10 -right-10 w-40 h-40 bg-amber-300 rounded-full blur-3xl opacity-40' />
          <div className='relative z-10'>
            <CardHeader className='p-0 mb-2'>
              <CardTitle className='flex justify-between items-center'>
                Deschise <FolderOpen className='text-amber-700' />
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-3xl font-semibold'>46</p>
            </CardContent>
            <CardFooter className='p-0 mt-2'>
              <Badge className='text-sm font-bold bg-green-300/30 text-green-700 rounded-md'>
                17%
              </Badge>
              <p className='pl-2 text-slate-600 text-sm'>fata de ieri</p>
            </CardFooter>
          </div>
        </Card>
        <Card className='relative overflow-hidden p-6'>
          <div className='absolute inset-0 bg-linear-to-br from-blue-100 via-transparent to-transparent' />

          <div className='absolute -top-10 -right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-40' />
          <div className='relative z-10'>
            <CardHeader className='p-0 mb-2'>
              <CardTitle className='flex justify-between items-center'>
                In progres <List className='text-blue-700' />
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-3xl font-semibold'>9</p>
            </CardContent>
            <CardFooter className='p-0 mt-2'>
              <Badge className='text-sm font-bold bg-green-300/30 text-green-700 rounded-md'>
                17%
              </Badge>
              <p className='pl-2 text-slate-600 text-sm'>fata de ieri</p>
            </CardFooter>
          </div>
        </Card>
        <Card className='relative overflow-hidden p-6'>
          <div className='absolute inset-0 bg-linear-to-br from-green-100 via-transparent to-transparent' />

          <div className='absolute -top-10 -right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl opacity-40' />
          <div className='relative z-10'>
            <CardHeader className='p-0 mb-2'>
              <CardTitle className='flex justify-between items-center'>
                Inchise <CheckCircle className='text-green-700' />
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <p className='text-3xl font-semibold'>6</p>
            </CardContent>
            <CardFooter className='p-0 mt-2'>
              <Badge className='text-sm font-bold bg-green-300/30 text-green-700 rounded-md'>
                17%
              </Badge>
              <p className='pl-2 text-slate-600 text-sm'>fata de ieri</p>
            </CardFooter>
          </div>
        </Card>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-5'>
        <Card>
          <CardHeader>
            <CardTitle className='flex justify-between items-center'>
              Tickete recente{' '}
              <Button variant='link'>
                Vezi toate
                <ArrowRight />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='flex flex-col gap-3'>
              <li className='flex items-center gap-10'>
                <span className='font-bold'>#2</span> Client{' '}
                <span className='text-muted-foreground'> Message...</span>
                <span>
                  <Badge variant='secondary'>Open</Badge>
                </span>
              </li>
              <li className='flex items-center gap-10'>
                <span className='font-bold'>#12</span> Client{' '}
                <span className='text-muted-foreground'> Message...</span>
                <span>
                  <Badge variant='secondary'>Open</Badge>
                </span>
              </li>
              <li className='flex items-center gap-10'>
                <span className='font-bold'>#21</span> Client{' '}
                <span className='text-muted-foreground'> Message...</span>
                <span>
                  <Badge variant='secondary'>Open</Badge>
                </span>
              </li>
              <li className='flex items-center gap-10'>
                <span className='font-bold'>#22</span> Client{' '}
                <span className='text-muted-foreground'> Message...</span>
                <span>
                  <Badge variant='secondary'>Open</Badge>
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activitate recenta</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='flex flex-col gap-3'>
              <li className='flex items-center gap-2'>
                <MessageCircle className='size-4' />
                <span className='font-bold'>Alex</span>
                <span>change status of ticket</span>
                <span className='text-muted-foreground'>5 min ago</span>
              </li>
              <li className='flex items-center gap-2'>
                <MessageCircle className='size-4' />
                <span className='font-bold'>Alex</span>
                <span>change status of ticket</span>
                <span className='text-muted-foreground'>5 min ago</span>
              </li>
              <li className='flex items-center gap-2'>
                <MessageCircle className='size-4' />
                <span className='font-bold'>Alex</span>
                <span>change status of ticket</span>
                <span className='text-muted-foreground'>5 min ago</span>
              </li>{' '}
              <li className='flex items-center gap-2'>
                <MessageCircle className='size-4' />
                <span className='font-bold'>Alex</span>
                <span>change status of ticket</span>
                <span className='text-muted-foreground'>5 min ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tichete pe ultimele 7 zile</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

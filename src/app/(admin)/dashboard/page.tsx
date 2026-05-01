import { Badge } from '@/components/ui/badge';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { requireAuth } from '@/lib/auth-utils';

import {
  ArrowRight,
  CheckCircle,
  FolderOpen,
  List,
  MessageCircle,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  await requireAuth();
  return (
    <div className='pt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <Card className='relative overflow-hidden h-40 gap-2 hover:-translate-y-1 transition'>
          <div className='bg-purple-500 w-full h-0.5 absolute top-0'></div>

          <CardHeader>
            <CardTitle className='flex justify-between items-center uppercase text-base text-slate-500/90 font-semibold'>
              Total tickets{' '}
              <Ticket className='text-purple-400 bg-purple-200/50 h-8 w-8 rounded-md p-1' />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className='text-4xl text-purple-400 font-bold'>146</p>
          </CardContent>

          <CardFooter>
            <Badge className='text-xs font-semibold bg-green-300/30 text-green-700 rounded-md'>
              17%
            </Badge>
            <p className='pl-2 text-slate-600 text-sm'>fata de ieri</p>
          </CardFooter>
        </Card>
        <Card className='relative overflow-hidden h-40 gap-2 hover:-translate-y-1 transition'>
          <div className='bg-amber-500 w-full h-0.5 absolute top-0'></div>

          <CardHeader>
            <CardTitle className='flex justify-between items-center uppercase text-base text-slate-500/90 font-semibold'>
              Deschise{' '}
              <FolderOpen className='text-amber-700 bg-amber-200/50 h-8 w-8 rounded-md p-1' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl text-amber-400 font-bold'>46</p>
          </CardContent>
          <CardFooter>
            <Badge className='text-xs font-semibold bg-green-300/30 text-green-700 rounded-md'>
              17%
            </Badge>
            <p className='pl-2 text-slate-600 text-sm'>fata de ieri</p>
          </CardFooter>
        </Card>
        <Card className='relative overflow-hidden h-40 gap-2 hover:-translate-y-1 transition'>
          <div className='bg-blue-500 w-full h-0.5 absolute top-0'></div>

          <CardHeader>
            <CardTitle className='flex justify-between items-center uppercase text-base text-slate-500/90 font-semibold'>
              In progres{' '}
              <List className='text-blue-700 bg-blue-200/50 h-8 w-8 rounded-md p-1' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl text-blue-400 font-bold'>9</p>
          </CardContent>
        </Card>
        <Card className='relative overflow-hidden h-40 gap-2 hover:-translate-y-1 transition'>
          <div className='bg-green-500 w-full h-0.5 absolute top-0'></div>

          <CardHeader>
            <CardTitle className='flex justify-between items-center uppercase text-base text-slate-500/90 font-semibold'>
              Inchise{' '}
              <CheckCircle className='text-green-700  bg-green-200/50 h-8 w-8 rounded-md p-1' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl text-green-400 font-bold'>6</p>
          </CardContent>
          <CardFooter>
            <Badge className='text-xs font-semibold bg-green-300/30 text-green-700 rounded-md'>
              17%
            </Badge>
            <p className='pl-2 text-slate-600 text-sm'>fata de ieri</p>
          </CardFooter>
        </Card>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-5'>
        <Card>
          <CardHeader className='flex items-center justify-between'>
            <CardTitle className='text-slate-800 text-sm font-medium'>
              Tickete recente
            </CardTitle>
            <Link
              href='/tickets'
              className='text-sm text-blue-500 font-semibold flex items-center gap-1'
            >
              Vezi toate
              <ArrowRight className='h-4 w-4 pt-1' />
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow className='border-b border-slate-900'>
                  <TableCell className='font-medium'>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className='text-right'>$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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

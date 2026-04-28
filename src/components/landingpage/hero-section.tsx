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

export default function HeroSection() {
  return (
    <section className='bg-section'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
        <div>
          <Badge
            variant='outline'
            className='hidden md:inline-flex items-center gap-1 bg-slate-50 text-purple-500 p-2'
          >
            <Dot aria-hidden='true' />
            Ticketing simplu pentru firme mici
          </Badge>
          <h1 className='text-3xl md:text-6xl text-black font-semibold mt-3 md:mt-5'>
            Every client request. <br />
            <span className='text-blue-600 underline'>One clear inbox.</span>
          </h1>
          <p className='pt-8 text-slate-500/90 leading-loose max-w-lg text-sm md:text-lg'>
            Revelio ClientHub turns incoming messages from any channel into
            organized tickets. Your team always knows what needs attention —
            nothing gets lost.
          </p>
          <div className='mt-10 flex items-center gap-3'>
            <Button className='h-10 px-4 text-sm md:h-12 md:px-6 md:text-base bg-linear-to-r from-blue-600 to-purple-500'>
              Creeaza cont gratuit
            </Button>
            <Button
              variant='outline'
              className=' h-10 px-4 text-sm md:h-12 md:px-6 md:text-base bg-slate-50'
            >
              Cum functioneaza <ArrowRight aria-hidden='true' />
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
                  Incoming message
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
              <p className='font-semibold text-sm'>auto-converted to ticket</p>
            </div>
            <div className='ac-line'></div>
          </div>
          <Card className='relative overflow-hidden'>
            <div className='absolute flex justify-between bg-indigo-200/60 text-indigo-600 w-full top-0 py-2 px-5 text-xs font-medium border-b border-indigo-600'>
              TICKET #47 · CREATED AUTOMATICALLY
              <span className='font-semibold text-xs'>just now</span>
            </div>
            <CardHeader>
              <CardTitle className='pt-4'>Ionescu & Partners</CardTitle>
              <CardDescription>
                Annual report + Q3 breakdown · Due Friday
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-2'>
                <Badge className='bg-blue-100 text-blue-700 border border-blue-600 rounded-md'>
                  NEW
                </Badge>
                <Badge className='bg-red-100 text-red-700 border border-red-600 rounded-md'>
                  HIGH
                </Badge>
                <Badge className='bg-green-100 text-green-700  rounded-md'>
                  Email
                </Badge>
                <Badge className='bg-sky-100 text-sky-700 rounded-md'>
                  <Clock className='size-4' />2 min ago
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
                    Total tickets
                  </span>
                </div>

                <div className='flex flex-col items-center gap-1'>
                  <span className='font-medium text-2xl text-emerald-500'>
                    98%
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Response rate
                  </span>
                </div>

                <div className='flex flex-col items-center gap-1'>
                  <span className='font-medium text-2xl text-amber-700'>
                    1.4h
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Avg. response
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

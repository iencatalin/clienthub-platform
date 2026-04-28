import Link from 'next/link';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function CtaSection() {
  return (
    <section className='bg-section'>
      <div className='max-w-7xl mx-auto space-y-4 md:space-y-6'>
        <Card className='relative overflow-hidden max-w-2xl mx-auto'>
          <div className='bg-indigo-500 w-full h-1.5 absolute top-0 rounded-md'></div>
          <CardHeader className='text-center space-y-2 p-10'>
            <CardTitle className='text-3xl font-bold'>
              Ready to get organized?
            </CardTitle>
            <CardDescription className='text-slate-500 mx-auto max-w-md'>
              Start managing client requests in one place — for free, today, no
              setup headaches.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center items-center'>
            <CardAction>
              <Link
                href='/sign-up'
                className='bg-linear-to-r from-blue-600 to-purple-500 px-5 py-2 rounded-lg text-white text-xl hover:shadow-lg transition'
              >
                Începe gratuit
              </Link>
            </CardAction>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

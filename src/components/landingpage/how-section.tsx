import { Card, CardContent } from '../ui/card';

export default function HowSection() {
  return (
    <section className='p-6 md:p-16' id='how'>
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-2xl space-y-4 md:space-y-6'>
          <p className='text-blue-400 text-sm font-semibold uppercase tracking-wide'>
            Cum functioneaza
          </p>

          <h2 className='text-3xl md:text-5xl font-semibold'>
            From message to resolved in 3 simple steps
          </h2>

          <p className='text-muted-foreground max-w-md'>
            No complex setup. You`re live in under 5 minutes.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-5 md:pt-10'>
          <Card className='relative overflow-hidden'>
            <div className='bg-red-500 w-full h-1 absolute top-0 rounded-md'></div>
            <CardContent>
              <div className='text-2xl font-semibold bg-red-200 text-red-700 px-4 py-1 rounded-lg w-fit'>
                1
              </div>
              <h3 className='font-semibold text-base py-2'>
                Connect your channels
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Link your email addresses, WhatsApp Business number, or embed a
                web form. The system starts listening immediately
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
                Messages become tickets
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Every incoming message automatically creates an organized ticket
                with priority, source, and full context attached.
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
                Team replies from one place
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Your team sees everything in one dashboard, replies directly,
                and the client receives the answer on their preferred channel.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from '../ui/card';

export default function BannerSection() {
  return (
    <section className='bg-linear-to-tr from-blue-600 to-60% to-purple-500 text-slate-100'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-20'>
        <div>
          <p className='font-bold text-2xl max-w-56'>
            Built for teams that move fast{' '}
          </p>
          <p className='text-slate-200/70 text-sm pt-2 max-w-72'>
            Real numbers from teams using ClientHub to manage client requests
            daily.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>0</div>
              <div className='text-slate-200/70 text-sm'>
                Missed messages per month
              </div>
            </CardContent>
          </Card>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>-65%</div>
              <div className='text-slate-200/70 text-sm'>
                Avg. response time reduction
              </div>
            </CardContent>
          </Card>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>5 min</div>
              <div className='text-slate-200/70 text-sm'>
                Time to set up and go live
              </div>
            </CardContent>
          </Card>
          <Card className='bg-slate-100/20 backdrop-blur-2xl text-slate-50 mx-auto w-full max-w-xs'>
            <CardContent>
              <div className='text-4xl font-bold pb-1'>100%</div>
              <div className='text-slate-200/70 text-sm'>
                Free to start, no card needed
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

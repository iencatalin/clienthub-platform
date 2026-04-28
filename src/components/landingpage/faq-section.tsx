import { FileQuestion } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function FAQSection() {
  return (
    <section className='bg-section'>
      <div className='max-w-7xl mx-auto space-y-4 md:space-y-6'>
        <p className='text-blue-400 text-sm font-semibold uppercase tracking-wide'>
          FAQ
        </p>
        <h2 className='text-3xl md:text-5xl font-semibold'>Common questions</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-6'>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                Do my clients need to create an account?
              </CardTitle>
              <CardDescription>
                No. Clients interact exactly as they normally would — via email,
                WhatsApp, or web form. They never see the platform.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                Can I connect multiple email addresses?
              </CardTitle>
              <CardDescription>
                Yes, you can connect multiple email inboxes and WhatsApp numbers
                to the same workspace — useful for teams with different
                departments.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                What happens to existing conversations?
              </CardTitle>
              <CardDescription>
                New tickets are created from the moment you connect your
                channels. You can also create tickets manually for past
                conversations.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-slate-100/60 backdrop-blur-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center gap-1'>
                <FileQuestion className='text-blue-600 bg-sky-200/50 w-fit p-1 rounded-md' />{' '}
                Is it really free?
              </CardTitle>
              <CardDescription>
                Yes — the free plan is genuinely free with no time limit. You
                get core features to manage your team and client requests
                without paying anything.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

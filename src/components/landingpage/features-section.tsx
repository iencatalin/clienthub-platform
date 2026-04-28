import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function FeaturesSection() {
  return (
    <section className='bg-section'>
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-2xl space-y-4 md:space-y-6'>
          <p className='text-blue-400 text-sm font-semibold uppercase tracking-wide'>
            Features
          </p>
          <h2 className='text-3xl md:text-5xl font-semibold'>
            Everything you need, nothing you don`t
          </h2>
          <p className='text-muted-foreground max-w-md'>
            Built for small teams that deal with a high volume of client
            requests daily.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 pt-10'>
          <Card>
            <CardHeader className='space-y-2 px-4'>
              <div className='text-2xl bg-blue-100 w-fit p-1 rounded-md'>
                📬
              </div>

              <CardTitle>Ticket creation</CardTitle>

              <CardDescription>
                Incoming messages become tickets instantly — no manual entry, no
                copy-pasting, no missed requests.
              </CardDescription>
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

              <CardTitle>Live dashboard</CardTitle>

              <CardDescription className='text-sm leading-tight'>
                See open tickets, response times, and team performance at a
                glance. Know what`s urgent before it becomes a problem.
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

              <CardTitle>Full client history</CardTitle>

              <CardDescription className='text-sm'>
                Every conversation, across every channel, in one place per
                client. No more digging through inboxes.
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

              <CardTitle>Team management</CardTitle>

              <CardDescription>
                Assign tickets to team members, set roles (Owner, Admin, Agent),
                and track who`s handling what.
              </CardDescription>
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

              <CardTitle>Reply from dashboard</CardTitle>

              <CardDescription>
                Write your reply once and it goes out on the right channel
                automatically. Client gets it where they expect it.
              </CardDescription>
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

              <CardTitle>Tags & priorities</CardTitle>

              <CardDescription>
                Organize tickets with tags, set priorities, filter by anything.
                Find what you need in seconds.
              </CardDescription>
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

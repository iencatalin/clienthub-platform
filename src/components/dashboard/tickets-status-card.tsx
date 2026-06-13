import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  CheckCircle,
  FolderOpen,
  List,
  LucideIcon,
  Ticket,
} from 'lucide-react';

type CardConfig = {
  label: string;
  colorClass: string;
  iconColorClass: string;
  icon: LucideIcon;
  count: number;
  countColorClass: string;
};

type Props = {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
};

export default function TicketsStatusCard({
  total,
  open,
  inProgress,
  closed,
}: Props) {
  const cards: CardConfig[] = [
    {
      label: 'Total tickets',
      colorClass: 'bg-purple-500',
      iconColorClass: 'text-purple-400 bg-purple-200/50',
      icon: Ticket,
      count: total,
      countColorClass: 'text-purple-400',
    },
    {
      label: 'Deschise',
      colorClass: 'bg-amber-500',
      iconColorClass: 'text-amber-700 bg-amber-200/50',
      icon: FolderOpen,
      count: open,
      countColorClass: 'text-amber-700',
    },
    {
      label: 'In progres',
      colorClass: 'bg-blue-500',
      iconColorClass: 'text-blue-700 bg-blue-200/50',
      icon: List,
      count: inProgress,
      countColorClass: 'text-blue-700',
    },
    {
      label: 'Inchise',
      colorClass: 'bg-green-500',
      iconColorClass: 'text-green-700 bg-green-200/50',
      icon: CheckCircle,
      count: closed,
      countColorClass: 'text-green-700',
    },
  ];
  return (
    <>
      {cards.map((card) => (
        <Card
          key={card.label}
          className='relative overflow-hidden h-40 gap-2 hover:-translate-y-1 transition'
        >
          <div
            className={`${card.colorClass} w-full h-0.5 absolute top-0`}
          ></div>

          <CardHeader>
            <CardTitle className='flex justify-between items-center uppercase text-base text-slate-500/90 font-semibold'>
              {card.label}
              <card.icon
                className={`${card.iconColorClass} h-8 w-8 rounded-md p-1`}
              />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className={`${card.countColorClass} text-4xl  font-bold`}>
              {card.count}
            </p>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      ))}
    </>
  );
}

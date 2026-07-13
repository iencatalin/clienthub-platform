'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartConfig = {
  total: {
    label: 'Tickets',
    color: '#2563eb',
  },
} satisfies ChartConfig;

type Props = {
  data: {
    status: string;
    total: number;
  }[];
};

export function TicketsChart({ data }: Props) {
  return (
    <ChartContainer config={chartConfig} className='h-64 w-full'>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey='status'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        <Bar
          dataKey='total'
          fill='var(--color-total)'
          radius={6}
          barSize={32}
        />
      </BarChart>
    </ChartContainer>
  );
}

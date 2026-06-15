'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', open: 186, closed: 80 },
  { month: 'February', open: 305, closed: 200 },
  { month: 'March', open: 237, closed: 120 },
  { month: 'April', open: 73, closed: 190 },
  { month: 'May', open: 209, closed: 130 },
  { month: 'June', open: 214, closed: 140 },
];

const chartConfig = {
  open: {
    label: 'open',
    color: '#2563eb',
  },
  closed: {
    label: 'closed',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function TicketsChart() {
  return (
    <ChartContainer config={chartConfig} className='h-[200px] w-full'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey='open' fill='var(--color-open)' radius={4} />
        <Bar dataKey='closed' fill='var(--color-closed)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

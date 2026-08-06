'use client';

import { Pie, PieChart, Cell } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartConfig = {
  new: {
    label: 'New',
    color: '#3b82f6',
  },
  progress: {
    label: 'In Progress',
    color: '#f59e0b',
  },
  closed: {
    label: 'Closed',
    color: '#22c55e',
  },
} satisfies ChartConfig;

type TicketsPieChartProps = {
  data: {
    status: string;
    total: number;
    fill: string;
  }[];
};

export function TicketsPieChart({ data }: TicketsPieChartProps) {
  const isEmpty = data.every((item) => item.total === 0);

  return isEmpty ? (
    <div className='flex h-80 w-full items-center justify-center text-muted-foreground'>
      No data available
    </div>
  ) : (
    <>
      <ChartContainer config={chartConfig} className='h-80 w-full'>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Pie
            data={data}
            dataKey='total'
            nameKey='status'
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            strokeWidth={4}
          >
            {data.map((entry) => (
              <Cell key={entry.status} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className='grid grid-cols-3 gap-4'>
        {data.map((item) => (
          <div
            key={item.status}
            className='flex items-center justify-center gap-2 text-sm'
          >
            <span
              className='h-3 w-3 rounded-full'
              style={{ backgroundColor: item.fill }}
            />

            <div className='flex flex-col'>
              <span className='font-medium'>{item.status}</span>
              <span className='text-muted-foreground'>
                {item.total} tickets
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

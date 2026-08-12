'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

export default function TicketPriorityFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleFilter(priority: string) {
    const params = new URLSearchParams(searchParams);

    if (priority) {
      params.set('priority', priority);
    } else {
      params.delete('priority');
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary'>
          Priority <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleFilter('')}>
          ALL
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilter('LOW')}>
          LOW
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilter('MEDIUM')}>
          MEDIUM
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilter('HIGH')}>
          HIGH
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

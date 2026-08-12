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

export default function TicketSourceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleFilter(source: string) {
    const params = new URLSearchParams(searchParams);

    if (source) {
      params.set('source', source);
    } else {
      params.delete('source');
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary'>
          Source <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleFilter('')}>
          ALL
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilter('WEB')}>
          WEB
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilter('PHONE')}>
          PHONE
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilter('WHATSAPP')}>
          WHATSAPP
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

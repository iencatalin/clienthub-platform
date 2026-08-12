'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { Contact } from '@/types';
import { Separator } from '../ui/separator';

type Props = {
  contacts: Contact[];
  value: string;
  onChange: (value: string) => void;
  onCreateContact: () => void;
};

export function ContactCombobox({
  contacts,
  value,
  onChange,
  onCreateContact,
}: Props) {
  const [open, setOpen] = useState(false);
  const currentContact = contacts.find((c) => c.id === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          role='combobox'
          className='w-full justify-between bg-slate-200/50 text-slate-400/70 text-sm font-normal hover:ring-1 ring-indigo-500/90 transition'
        >
          {currentContact
            ? (currentContact.name ??
              currentContact.email ??
              currentContact.phone)
            : 'Select contact...'}{' '}
          <ChevronDown className='ml-2 size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-4xl'>
        <Command>
          <CommandInput placeholder='Search by name, email, phone' />
          <CommandList>
            <CommandEmpty>
              <div className='flex flex-col items-center gap-2 py-2'>
                <p className='text-muted-foreground'>No contact found</p>
                <Button size='sm' variant='outline' onClick={onCreateContact}>
                  <Plus className='size-4 mr-1' />
                  Create new contact
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {contacts.map((contact) => (
                <CommandItem
                  key={contact.id}
                  value={`${contact.name} ${contact.email} ${contact.phone}`}
                  onSelect={() => {
                    onChange(contact.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === contact.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <div className='flex flex-col'>
                    <span>{contact.name ?? 'No name'}</span>
                    <span className='text-xs text-muted-foreground'>
                      {contact.email ?? contact.phone}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <Separator />
            <CommandGroup>
              <CommandItem onSelect={onCreateContact}>
                <Plus className='mr-2 size-4' />
                Create new contact
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

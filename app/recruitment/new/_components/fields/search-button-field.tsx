'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import { Button } from '~/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/command';
import ErrorText from '~/components/error-text';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover';
import useFetchCompanionPerformances from '~/hooks/queries/useFetchCompanionPerformances';
import { UseFormReturn } from '~/hooks/useForm/types';
import { cn } from '~/libs/utils';

interface SearchButtonFieldProps<K extends string> extends FieldProps {
  id: K;
  listCount?: number;
  notFoundText?: string;
}

export const SearchButtonField = <
  K extends GetKeysValueOf<CompanionFormValue, string>,
>({
  id,
  placeholder,
  notFoundText = '검색 결과가 없습니다.',
  label,
  variant,
  listCount,
}: SearchButtonFieldProps<K>) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const { values, handleValueChange, errors } =
    React.useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

  const handleSelect = (commandId: string) => (currentValue: string) => {
    handleValueChange(id)(commandId === values[id] ? '' : commandId);
    setName(currentValue);

    setOpen(false);
  };

  const { data: performances } = useFetchCompanionPerformances(value);

  const handleInputValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <Field id={id} label={label} variant={variant}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {values[id] ? name : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              onValueChange={handleInputValueChange}
            />
            <CommandList>
              <CommandEmpty>{notFoundText}</CommandEmpty>
              <CommandGroup>
                {performances
                  ?.map(({ id: commandId, name }) => (
                    <CommandItem
                      key={commandId}
                      value={name}
                      onSelect={handleSelect(String(commandId))}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          +values[id] === commandId
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {name}
                    </CommandItem>
                  ))
                  .slice(0, listCount)}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        <ErrorText message={errors[id]} />
      </Popover>
    </Field>
  );
};

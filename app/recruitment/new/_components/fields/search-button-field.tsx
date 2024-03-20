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
  valueId: K;
  listCount?: number;
  notFoundText?: string;
}

export const SearchButtonField = <
  K extends GetKeysValueOf<CompanionFormValue, string>,
>({
  id,
  valueId,
  placeholder,
  notFoundText = '검색 결과가 없습니다.',
  label,
  variant,
  listCount,
}: SearchButtonFieldProps<K>) => {
  const [open, setOpen] = useState(false);
  const { values, handleValueChange, errors } =
    React.useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

  const handleSelect = (commandId: string) => (currentValue: string) => {
    handleValueChange(id)(commandId);
    handleValueChange(valueId)(currentValue);

    setOpen(false);
  };

  const { data: performances, isSuccess } = useFetchCompanionPerformances(
    values[valueId],
  );

  const handleInputValueChange = (value: string) => {
    handleValueChange(valueId)(value);
  };

  React.useEffect(() => {
    if (isSuccess && !values[id]) {
      handleValueChange(id)(String(performances?.[0]?.id));
    }
  }, [isSuccess, id, handleValueChange, values, performances]);

  return (
    <Field id={id} label={label} variant={variant}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open}>
            <span className="truncate">
              {values[valueId] ? values[valueId] : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 self-end opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
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

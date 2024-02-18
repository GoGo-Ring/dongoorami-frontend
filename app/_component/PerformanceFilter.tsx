'use client';

import React, { ReactNode } from 'react';

import { Button } from '~/components/button';
import { Checkbox } from '~/components/checkbox';
import { MULTIPLE_SELECTION_AVAILABLE } from '~/constants/Filter';

interface PerformanceFilterProps {
  children?: ReactNode;
}

interface SelectionFieldProps {
  category: string;
  options: string[];
  isMultipleSelection?: boolean;
}

interface SelectionProps {
  children: string;
}

const ButtonItem = ({ children }: SelectionProps) => {
  return (
    <Button
      className="h-6 rounded-full px-3 py-[6px] text-xs"
      variant="outline"
    >
      {children}
    </Button>
  );
};

const ButtonSelectionField = ({
  category,
  options,
  isMultipleSelection,
}: SelectionFieldProps) => {
  return (
    <div className="flex w-[240px] flex-col gap-2">
      <div className="flex items-center">
        <span className="font-semibold">{category}</span>
        {isMultipleSelection && (
          <span className="text-xs text-gray-300">
            {MULTIPLE_SELECTION_AVAILABLE}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {options.map(option => (
          <ButtonItem key={option}>{option}</ButtonItem>
        ))}
      </div>
    </div>
  );
};

const CheckboxItem = ({ children }: SelectionProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={children} />
      <label
        htmlFor={children}
        className="text-sm font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
};

const CheckboxSelectionField = ({ category, options }: SelectionFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">{category}</span>
      <div className="flex flex-col gap-1">
        {options.map(option => (
          <CheckboxItem key={option}>{option}</CheckboxItem>
        ))}
      </div>
    </div>
  );
};

const PerformanceFilter = ({ children }: PerformanceFilterProps) => {
  return (
    <form>
      <div className="flex w-[260px] flex-col gap-6">
        {children}
        <Button variant="outline" type="submit">
          검색
        </Button>
      </div>
    </form>
  );
};

PerformanceFilter.ButtonSelectionField = ButtonSelectionField;
PerformanceFilter.CheckboxSelectionField = CheckboxSelectionField;

export default PerformanceFilter;

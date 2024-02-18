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
  isMultipleSelection?: boolean;
  children: ReactNode;
}

interface ItemProps {
  label: string;
}

const ButtonItem = ({ label }: ItemProps) => {
  return (
    <Button
      className="h-6 rounded-full px-3 py-[6px] text-xs"
      variant="outline"
    >
      {label}
    </Button>
  );
};

const ButtonSelectionField = ({
  category,
  children,
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
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
};

const CheckboxItem = ({ label }: ItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

const CheckboxSelectionField = ({
  category,
  children,
}: SelectionFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">{category}</span>
      <div className="flex flex-col gap-1">{children}</div>
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

PerformanceFilter.ButtonItem = ButtonItem;
PerformanceFilter.CheckboxItem = CheckboxItem;
PerformanceFilter.ButtonField = ButtonSelectionField;
PerformanceFilter.CheckboxField = CheckboxSelectionField;

export default PerformanceFilter;

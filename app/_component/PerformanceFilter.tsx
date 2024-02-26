'use client';

import React, { ReactNode } from 'react';

import { Button } from '~/components/button';
import { Checkbox } from '~/components/checkbox';
import {
  MULTIPLE_SELECTION_AVAILABLE,
  SEARCH,
  SELECTION,
} from '~/constants/Filter';

interface SelectionFieldProps {
  category: string;
  options: string[];
  isMultipleSelection?: boolean;
  children?: ReactNode;
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
          <ButtonItem key={option} label={option} />
        ))}
      </div>
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

const CheckboxSelectionField = ({ category, options }: SelectionFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">{category}</span>
      <div className="flex flex-col gap-1">
        {options.map(option => (
          <CheckboxItem key={option} label={option} />
        ))}
      </div>
    </div>
  );
};

const PerformanceFilter = () => {
  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <ButtonSelectionField
        category={SELECTION.GENRE.category}
        options={SELECTION.GENRE.options}
      />
      <ButtonSelectionField
        category={SELECTION.STATUS.category}
        options={SELECTION.STATUS.options}
      />
      <CheckboxSelectionField
        category={SELECTION.REGIONS.category}
        options={SELECTION.REGIONS.options}
      />
      <Button variant="outline" type="submit">
        {SEARCH}
      </Button>
    </div>
  );
};

export default PerformanceFilter;

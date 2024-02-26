'use client';

import React from 'react';

import { Button } from '~/components/button';
import { MULTIPLE_SELECTION_AVAILABLE } from '~/constants/Filter';

interface SelectionFieldProps {
  category: string;
  options: string[];
  isMultipleSelection?: boolean;
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

const ButtonSelectField = ({
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

export default ButtonSelectField;

'use client';

import React from 'react';

import { Checkbox } from '~/components/checkbox';

interface SelectionFieldProps {
  category: string;
  options: string[];
  isMultipleSelection?: boolean;
}

interface ItemProps {
  label: string;
}

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

const CheckboxSelectField = ({ category, options }: SelectionFieldProps) => {
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

export default CheckboxSelectField;

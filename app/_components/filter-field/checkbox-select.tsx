'use client';

import React, { forwardRef } from 'react';

import { Checkbox } from '~/components/checkbox';

import { checkboxOptionType } from '../companion-recruitment-filter';

interface ItemProps {
  label: string;
  onClick: (value: string) => void;
}
interface CheckboxSelectFieldProps {
  category: string;
  options: string[];
  isMultipleSelection?: boolean;
}

const CheckboxItem = ({ label, onClick }: ItemProps) => {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} onClick={handleClick} />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

const CheckboxSelectField = forwardRef<
  checkboxOptionType,
  CheckboxSelectFieldProps
>(({ category, options }, ref) => {
  const onClick = (value: string) => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      return;
    }

    if (!ref.current) {
      return;
    }
    ref.current[value] = !ref.current[value];
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">{category}</span>
      <div className="flex flex-col gap-1">
        {options.map(option => (
          <CheckboxItem key={option} label={option} onClick={onClick} />
        ))}
      </div>
    </div>
  );
});

CheckboxSelectField.displayName = 'CheckboxSelectField';
export default CheckboxSelectField;

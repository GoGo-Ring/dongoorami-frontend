'use client';

import React, { MouseEvent, forwardRef, useState } from 'react';

import { Checkbox } from '~/components/checkbox';

interface ItemProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
interface CheckboxSelectFieldProps {
  category: string;
  options: string[];
  isMultipleSelection?: boolean;
}

const CheckboxItem = ({ label, onClick }: ItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} value={label} onClick={onClick} />
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
  Record<string, boolean>,
  CheckboxSelectFieldProps
>(({ category, options }, ref) => {
  const [checkbox, setCheckbox] = useState(
    options.reduce(
      (acc, option) => {
        acc[option] = false;

        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    return;
  }

  if (!ref.current) {
    return;
  }
  ref.current = checkbox;

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setCheckbox({ ...checkbox, [value]: !checkbox[value] });
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

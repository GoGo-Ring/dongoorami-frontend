'use client';

import React, { MouseEvent, memo, useEffect, useState } from 'react';

import { Checkbox } from '~/components/checkbox';

import { OptionsPartialType } from '../companion-recruitment-filter';

interface ItemProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
interface CheckboxSelectFieldProps {
  category: string;
  options: string[];
  setOption: (category: string, selectedOption: OptionsPartialType) => void;
  fieldName: string;
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

const CheckboxSelectField = ({
  category,
  options,
  setOption,
  fieldName,
}: CheckboxSelectFieldProps) => {
  const [checkbox, setCheckbox] = useState(
    options.reduce(
      (acc, option) => {
        acc[option] = false;

        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  useEffect(() => {
    const selected = Object.keys(checkbox).filter(key => checkbox[key]);

    setOption(fieldName, selected);
  }, [checkbox, setOption, fieldName]);

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

export default memo(CheckboxSelectField);

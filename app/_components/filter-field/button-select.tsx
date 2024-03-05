'use client';

import React, { MouseEvent, useState } from 'react';

import { Button } from '~/components/button';
import { MULTIPLE_SELECTION_AVAILABLE } from '~/constants/filterField';

interface SelectionFieldProps {
  category: string;
  options: string[];
  isMultipleSelection?: boolean;
}

interface ItemProps {
  label: string;
  isClicked: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonItem = ({ label, isClicked, onClick }: ItemProps) => {
  const variant = isClicked ? 'default' : 'outline';

  return (
    <Button
      className={'h-6 rounded-full border px-3 py-[6px] text-xs'}
      variant={variant}
      name={label}
      onClick={onClick}
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
  const [isClicked, setIsClicked] = useState(
    options.reduce(
      (acc, cur) => {
        acc[cur] = false;

        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    const newIsClicked = { ...isClicked, [name]: !isClicked[name] };

    setIsClicked(newIsClicked);
    Object.keys(newIsClicked).filter(key => newIsClicked[key]);
  };

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
          <ButtonItem
            key={option}
            label={option}
            onClick={onClick}
            isClicked={isClicked[option]}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonSelectField;

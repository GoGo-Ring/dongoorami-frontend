'use client';

import { MouseEvent, useState } from 'react';

import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

interface optionProps {
  label?: string;
  value: string;
}
interface RadioItemProps {
  label?: string;
  value: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface RadioFieldProps {
  category: string;
  options: optionProps[];
}

const RadioItem = ({ label, value, onClick }: RadioItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={label} onClick={onClick} />
      <Label className="hover:cursor-pointer" htmlFor={label}>
        {label}
      </Label>
    </div>
  );
};

const RadioField = ({ category, options }: RadioFieldProps) => {
  const defaultValue = options[0].value;
  const [, setState] = useState('');

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setState(value);
  };

  return (
    <div>
      <span className="font-semibold">{category}</span>
      <RadioGroup defaultValue={defaultValue}>
        {options.map(({ label, value }) => (
          <RadioItem
            key={label}
            label={label}
            value={value}
            onClick={onClick}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioField;

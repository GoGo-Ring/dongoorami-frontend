'use client';
import { useState } from 'react';

import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

interface ItemProps {
  label?: string;
  value: string;
}

interface RadioFieldProps {
  category: string;
  options: ItemProps[];
  defaultValue: string;
  handleState: (category: string, value: string) => void;
}

const RadioItem = ({ label, value }: ItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={label} />
      <Label className="hover:cursor-pointer" htmlFor={label}>
        {label}
      </Label>
    </div>
  );
};

const RadioField = ({
  category,
  options,
  defaultValue,
  handleState,
}: RadioFieldProps) => {
  const [, setSelectedOption] = useState(defaultValue);
  const onValueChange = (value: string) => {
    handleState(category, value);
    setSelectedOption(value);
  };

  return (
    <div>
      <span className="font-semibold">{category}</span>
      <RadioGroup defaultValue={defaultValue} onValueChange={onValueChange}>
        {options.map(({ label, value }) => (
          <RadioItem key={label} label={label} value={value} />
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioField;

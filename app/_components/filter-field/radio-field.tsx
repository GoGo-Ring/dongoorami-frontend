'use client';

import { MouseEvent, memo, useEffect, useState } from 'react';

import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

import { OptionsPartialType } from '../companion-recruitment-filter';

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
  setOption: (category: string, selectedOption: OptionsPartialType) => void;
  fieldName: string;
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

const RadioField = ({
  category,
  options,
  setOption,
  fieldName,
}: RadioFieldProps) => {
  const defaultValue = options[0].value;
  const [state, setState] = useState('');

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setState(value);
  };

  useEffect(() => {
    setOption(fieldName, state);
  }, [state, setOption, fieldName]);

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

export default memo(RadioField);

'use client';

import { forwardRef } from 'react';

import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

interface optionProps {
  label?: string;
  value: string;
}
interface RadioItemProps {
  label?: string;
  value: string;
  onClick: (value: string) => void;
}

interface RadioFieldProps {
  category: string;
  options: optionProps[];
}

const RadioItem = ({ label, value, onClick }: RadioItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        value={value}
        id={label}
        onClick={onClick.bind(null, value)}
      />
      <Label className="hover:cursor-pointer" htmlFor={label}>
        {label}
      </Label>
    </div>
  );
};

const RadioField = forwardRef<string, RadioFieldProps>(
  ({ category, options }, ref) => {
    const defaultValue = options[0].value;

    const onClick = (value: string) => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        return;
      }
      ref.current = value;
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
  },
);

RadioField.displayName = 'RadioField';

export default RadioField;

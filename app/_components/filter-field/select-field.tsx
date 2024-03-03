'use client';
import { forwardRef, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/select';

interface SelectOptionItemProps {
  value: number;
  label: string;
}

interface SelectFieldProps {
  category: string;
  options: SelectOptionItemProps[];
  defaultValue: number;
  placeholder: string;
}

const SelectOptionItem = ({ value, label }: SelectOptionItemProps) => {
  const optionValue = value.toString();

  return <SelectItem value={optionValue}>{label}</SelectItem>;
};

const SelectField = forwardRef<number, SelectFieldProps>(
  ({ category, options, defaultValue, placeholder }, ref) => {
    const defaultString = defaultValue.toString();
    const [selectValue, setSelectValue] = useState(defaultString);

    if (!ref) {
      return;
    }
    if (typeof ref === 'function') {
      return;
    }
    if (!ref.current) {
      return;
    }
    ref.current = parseInt(selectValue);

    const onValueChange = (value: string) => {
      setSelectValue(value);
    };

    return (
      <div>
        <span className="font-semibold">{category}</span>
        <Select onValueChange={onValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={placeholder}
              defaultValue={defaultString}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map(({ label, value }) => (
                <SelectOptionItem key={label} label={label} value={value} />
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
);

SelectField.displayName = 'SelectField';

export default SelectField;

'use client';
import { useState } from 'react';

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
  handleState: (category: string, value: string) => void;
}

const SelectOptionItem = ({ value, label }: SelectOptionItemProps) => {
  const optionValue = value.toString();

  return <SelectItem value={optionValue}>{label}</SelectItem>;
};

const SelectField = ({
  category,
  options,
  defaultValue,
  placeholder,
  handleState,
}: SelectFieldProps) => {
  const [, setSelectedOption] = useState(defaultValue.toString());

  const onValueChange = (value: string) => {
    setSelectedOption(value);
    handleState(category, value);
  };

  return (
    <div>
      <span className="font-semibold">{category}</span>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
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
};

export default SelectField;

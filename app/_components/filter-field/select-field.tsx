'use client';

import { memo, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/select';

import { OptionsPartialType } from '../companion-recruitment-filter';

interface SelectOptionItemProps {
  value: number;
  label: string;
}

interface SelectFieldProps {
  category: string;
  options: SelectOptionItemProps[];
  defaultValue: number;
  placeholder: string;
  setOption: (category: string, selectedOption: OptionsPartialType) => void;
  fieldName: string;
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
  setOption,
  fieldName,
}: SelectFieldProps) => {
  const defaultString = defaultValue.toString();
  const [selectValue, setSelectValue] = useState(defaultString);

  const onValueChange = (value: string) => {
    setSelectValue(value);
  };

  useEffect(() => {
    setOption(fieldName, parseInt(selectValue));
  }, [selectValue, setOption, fieldName]);

  return (
    <div>
      <span className="font-semibold">{category}</span>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} defaultValue={defaultString} />
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

export default memo(SelectField);

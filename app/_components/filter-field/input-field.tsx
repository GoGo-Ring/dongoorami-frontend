'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '~/components/input';

import { OptionsPartialType } from '../companion-recruitment-filter';

interface InputItemProps {
  type: string;
  name: string;
  defaultValue?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

interface InputFieldProps {
  category: string;
  defaultValues: number[];
  setOption: (category: string, selectedOption: OptionsPartialType) => void;
  fieldName: string;
}

const InputItem = ({ type, name, onChange, value }: InputItemProps) => {
  return (
    <Input
      type={type}
      className="w-16"
      name={name}
      min={0}
      max={100}
      value={value}
      onChange={onChange}
    />
  );
};

const InputField = ({
  category,
  defaultValues,
  setOption,
  fieldName,
}: InputFieldProps) => {
  const [minValue, maxValue] = defaultValues;
  const [inputs, setInputs] = useState({
    min: minValue,
    max: maxValue,
  });
  const { min, max } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    setInputs({ ...inputs, [name]: parseInt(value) });
  };

  useEffect(() => {
    const { min, max } = inputs;
    const selected: [number, number] = [min, max];

    setOption(fieldName, selected);
  }, [inputs, setOption, fieldName]);

  return (
    <>
      <span className="font-semibold">{category}</span>
      <div className="flex flex-row gap-1">
        <InputItem type="number" name="min" value={min} onChange={onChange} />
        <span className="my-auto ">~</span>
        <InputItem type="number" name="max" value={max} onChange={onChange} />
      </div>
    </>
  );
};

export default InputField;

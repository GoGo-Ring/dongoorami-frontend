'use client';
import { ChangeEvent, useState } from 'react';

import { Input } from '~/components/input';

interface InputItemProps {
  type: string;
  name: string;
  defaultValue: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputFieldProps {
  category: string;
  defaultValues: number[];
}

const InputItem = ({ type, name, defaultValue, onChange }: InputItemProps) => {
  return (
    <Input
      defaultValue={defaultValue}
      type={type}
      className="w-16"
      name={name}
      min={0}
      max={100}
      onChange={onChange}
    />
  );
};

const InputField = ({ category, defaultValues }: InputFieldProps) => {
  const [minValue, maxValue] = defaultValues;
  const [inputs, setInputs] = useState({
    min: minValue.toString(),
    max: maxValue.toString(),
  });

  [parseInt(inputs.min), parseInt(inputs.max)];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    setInputs({ ...inputs, [name]: value });
  };

  return (
    <>
      <span className="font-semibold">{category}</span>
      <div className="flex flex-row gap-1">
        <InputItem
          defaultValue={minValue}
          type="number"
          name="min"
          onChange={onChange}
        />
        <span className="my-auto ">~</span>
        <InputItem
          defaultValue={maxValue}
          type="number"
          name="max"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputField;

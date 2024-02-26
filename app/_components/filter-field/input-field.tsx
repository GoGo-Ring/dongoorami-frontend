'use client';
import { forwardRef, useRef } from 'react';

import { Input } from '~/components/input';

interface InputItemProps {
  type: string;
  defaultValue: number;
}

interface InputFieldProps {
  category: string;
  defaultValues: number[];
}

const InputItem = forwardRef<HTMLInputElement, InputItemProps>(
  ({ type, defaultValue }, ref) => {
    return (
      <Input type={type} className="w-16" min={0} max={100} ref={ref}>
        {defaultValue}
      </Input>
    );
  },
);

InputItem.displayName = 'InputItem';

const InputField = ({ category, defaultValues }: InputFieldProps) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const [minValue, maxValue] = defaultValues;

  return (
    <>
      <span className="font-semibold">{category}</span>
      <div className="flex flex-row gap-1">
        <InputItem defaultValue={minValue} type="number" ref={minRef} />
        <span className="my-auto ">~</span>
        <InputItem defaultValue={maxValue} type="number" ref={maxRef} />
      </div>
    </>
  );
};

export default InputField;

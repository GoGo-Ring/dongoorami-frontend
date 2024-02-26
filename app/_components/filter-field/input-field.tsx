'use client';
import { forwardRef, useRef } from 'react';

import { Input } from '~/components/input';

interface InputItemProps {
  type: string;
  defaultValue: number;
  onChange: () => void;
}

interface InputFieldProps {
  category: string;
  defaultValues: number[];
}

const InputItem = forwardRef<HTMLInputElement, InputItemProps>(
  ({ type, defaultValue, onChange }, ref) => {
    return (
      <Input
        defaultValue={defaultValue}
        type={type}
        className="w-16"
        min={0}
        max={100}
        ref={ref}
        onChange={onChange}
      />
    );
  },
);

InputItem.displayName = 'InputItem';

const InputField = forwardRef<number[], InputFieldProps>(
  ({ category, defaultValues }, ref) => {
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const [minValue, maxValue] = defaultValues;

    const onChange = () => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        return;
      }
      if (!ref.current || !minRef.current || !maxRef.current) {
        return;
      }
      if (typeof ref.current === 'function') {
        return;
      }
      ref.current = [
        parseInt(minRef.current.value),
        parseInt(maxRef.current.value),
      ];
    };

    return (
      <>
        <span className="font-semibold">{category}</span>
        <div className="flex flex-row gap-1">
          <InputItem
            defaultValue={minValue}
            type="number"
            ref={minRef}
            onChange={onChange}
          />
          <span className="my-auto ">~</span>
          <InputItem
            defaultValue={maxValue}
            type="number"
            ref={maxRef}
            onChange={onChange}
          />
        </div>
      </>
    );
  },
);

InputField.displayName = 'InputField';
export default InputField;

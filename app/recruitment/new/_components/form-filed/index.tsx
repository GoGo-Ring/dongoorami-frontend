'use client';
import { PropsWithChildren, useContext } from 'react';

import { Slider } from '~/app/recruitment/new/_components/double-thumb-slider';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { Input } from '~/components/input';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/select';

import { Field } from './field';
import type { FieldIds, FieldProps } from './field';

interface SelectFieldItemProps {
  items: string[];
}

interface SliderFieldProps extends FieldProps {
  minId: FieldIds;
  maxId: FieldIds;
}

export const InputField = ({ id, placeholder, label, variant }: FieldProps) => {
  const { values, handleChange, errors, registerValidation } =
    useContext(FormContext);

  registerValidation(id, '필수 입력사항입니다', value => value.length > 0);
  registerValidation(
    id,
    '최대 20자까지 입력 가능합니다',
    value => value.length <= 20,
  );

  return (
    <Field id={id} label={label} variant={variant}>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={values[id]}
        onChange={handleChange}
      />
      <p className="block p-2 text-xs text-destructive">
        {errors[id]?.map(message => message)}
      </p>
    </Field>
  );
};

export const FileField = ({ id, placeholder, label, variant }: FieldProps) => {
  const { values, handleChange } = useContext(FormContext);

  return (
    <Field id={id} label={label} variant={variant}>
      <Input
        id={id}
        className="cursor-pointer"
        type="file"
        placeholder={placeholder}
        value={values[id]}
        onChange={handleChange}
      />
    </Field>
  );
};

export const SelectField = ({
  id,
  placeholder,
  label,
  variant,
  children,
}: PropsWithChildren<FieldProps>) => {
  const { values, handleValueChange, registerValidation, errors } =
    useContext(FormContext);

  registerValidation(id, '필수 선택사항입니다', value => value.length > 0);

  return (
    <Field id={id} label={label} variant={variant}>
      <Select onValueChange={handleValueChange(id)} value={values[id]}>
        <SelectTrigger className="w-[180px]" id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
      <p className="block p-2 text-xs text-destructive">
        {errors[id]?.map(message => message)}
      </p>
    </Field>
  );
};

export const SelectFieldItem = ({ items }: SelectFieldItemProps) => (
  <>
    {items?.map(location => (
      <SelectItem key={location} value={location}>
        {location}
      </SelectItem>
    ))}
  </>
);

export const RadioGroupField = ({
  id,
  label,
  children,
  variant,
}: PropsWithChildren<FieldProps>) => {
  const { handleValueChange, values, registerValidation, errors } =
    useContext(FormContext);

  registerValidation(id, '필수 선택사항입니다', value => value.length > 0);

  return (
    <Field id={id} label={label} variant={variant}>
      <RadioGroup
        id={id}
        className="flex w-fit p-2"
        onValueChange={handleValueChange(id)}
        value={values[id]}
      >
        {children}
      </RadioGroup>
      <p className="block p-2 text-xs text-destructive">
        {errors[id]?.map(message => message)}
      </p>
    </Field>
  );
};

export const RadioGroupFieldItem = ({ id, label }: FieldProps) => {
  return (
    <Field id={id} label={label} labelVariant="radio">
      <RadioGroupItem value={id} id={id} />
    </Field>
  );
};

export const SliderField = ({
  id,
  minId,
  maxId,
  label,
  variant,
}: SliderFieldProps) => {
  const {
    values,
    handleChange,
    registerValidation,
    errors,
    handleSliderValueChange,
  } = useContext(FormContext);

  registerValidation(
    minId,
    '0 이상의 숫자를 입력해주세요',
    value => Number(value) >= 0,
  );
  registerValidation(
    maxId,
    '100 이하의 숫자를 입력해주세요',
    value => Number(value) <= 100,
  );
  registerValidation(
    maxId,
    '최대값은 최소값보다 작을 수 없습니다',
    value => Number(value) >= Number(values[minId]),
  );
  registerValidation(
    minId,
    '최소값은 최대값보다 클 수 없습니다',
    value => Number(value) <= Number(values[maxId]),
  );

  return (
    <Field id={id} label={label} variant={variant}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            id={minId}
            type="number"
            min={0}
            max={100}
            value={values[minId]}
            onChange={handleChange}
          />
          ~
          <Input
            id={maxId}
            type="number"
            min={0}
            max={100}
            value={values[maxId]}
            onChange={handleChange}
          />
        </div>
        <Slider
          id={id}
          value={[Number(values[minId]), Number(values[maxId])]}
          onValueChange={handleSliderValueChange(minId, maxId)}
        />
      </div>
      <p className="block p-2 text-xs text-destructive">
        {errors[minId]?.map(message => message)}
        {errors[maxId]?.map(message => message)}
      </p>
    </Field>
  );
};

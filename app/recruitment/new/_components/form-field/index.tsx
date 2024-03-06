'use client';
import { PropsWithChildren, useContext } from 'react';

import { Slider } from '~/app/recruitment/new/_components/double-thumb-slider';
import { Error } from '~/app/recruitment/new/_components/error';
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
  const { values, handleChange, errors } = useContext(FormContext);

  return (
    <Field id={id} label={label} variant={variant}>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={values[id]}
        onChange={handleChange}
      />
      <Error error={errors[id]} />
    </Field>
  );
};

export const FileField = ({ id, placeholder, label, variant }: FieldProps) => {
  const { values, handleChange, errors } = useContext(FormContext);

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
      <Error error={errors[id]} />
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
  const { values, handleValueChange, errors } = useContext(FormContext);

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
      <Error error={errors[id]} />
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
  const { handleValueChange, values, errors } = useContext(FormContext);

  return (
    <Field id={id} label={label} variant={variant}>
      <RadioGroup
        id={id}
        className="flex w-fit flex-nowrap"
        onValueChange={handleValueChange(id)}
        value={values[id]}
      >
        {children}
      </RadioGroup>
      <Error error={errors[id]} />
    </Field>
  );
};

export const RadioGroupFieldItem = ({ id, label }: FieldProps) => {
  return (
    <Field id={id} label={label} labelVariant="radio" variant="radio">
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
  const { values, errors, handleSliderInputChange, handleSliderValueChange } =
    useContext(FormContext);

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
            onChange={handleSliderInputChange({ id, minId, maxId })}
          />
          ~
          <Input
            id={maxId}
            type="number"
            min={0}
            max={100}
            value={values[maxId]}
            onChange={handleSliderInputChange({ id, minId, maxId })}
          />
        </div>
        <Slider
          id={id}
          value={[Number(values[minId]), Number(values[maxId])]}
          onValueChange={handleSliderValueChange({ id, minId, maxId })}
        />
      </div>
      <Error error={errors[id]} />
    </Field>
  );
};

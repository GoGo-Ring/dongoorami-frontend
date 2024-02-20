'use client';
import { PropsWithChildren, useContext } from 'react';

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

import { Field, FieldProps, FieldIds } from './common/field';
import { FormContext } from './common/form';
import { Slider } from './double-thumb-slider';

interface SelectFieldItemProps {
  items: string[];
}

interface SliderFieldProps extends FieldProps {
  minId: FieldIds;
  maxId: FieldIds;
}

export const InputField = ({ id, placeholder, label, variant }: FieldProps) => {
  const { values, handleChange } = useContext(FormContext);

  return (
    <Field id={id} label={label} variant={variant}>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={values[id]}
        onChange={handleChange}
      />
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
  const { setValues, values } = useContext(FormContext);

  return (
    <Field id={id} label={label} variant={variant}>
      <Select
        onValueChange={value => {
          setValues({ ...values, [id]: value });
        }}
        value={values[id]}
      >
        <SelectTrigger className="w-[180px]" id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
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
  const { setValues, values } = useContext(FormContext);

  return (
    <Field id={id} label={label} variant={variant}>
      <RadioGroup
        id={id}
        className="flex w-full items-center"
        onValueChange={value => {
          setValues({ ...values, [id]: value });
        }}
        value={values[id]}
      >
        {children}
      </RadioGroup>
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
  const { setValues, handleChange, values } = useContext(FormContext);

  return (
    <Field id={id} label={label} variant={variant}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            id={minId}
            type="text"
            min={0}
            value={values[minId]}
            onChange={handleChange}
          />
          ~
          <Input
            id={maxId}
            type="text"
            max={100}
            value={values[maxId]}
            onChange={handleChange}
          />
        </div>
        <Slider
          id={id}
          value={[Number(values[minId]), Number(values[maxId])]}
          minStepsBetweenThumbs={1}
          onValueChange={value => {
            setValues({ ...values, [minId]: value[0], [maxId]: value[1] });
          }}
        />
      </div>
    </Field>
  );
};

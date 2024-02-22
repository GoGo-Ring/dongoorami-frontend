'use client';
import { PropsWithChildren, useContext } from 'react';

import { Slider } from '~/app/recruitment/new/_components/double-thumb-slider';
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

import { Field, FieldProps, FieldIds } from './field';
import { FormContext } from '../form';

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
  const { setValues, values, handleChange } = useContext(FormContext);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    const result: { [key in FieldIds]: string } & { [key: string]: string } = {
      ...values,
      [id]: value,
    };

    if (Number(result[id]) < 0) {
      result[id] = '0';
    } else if (Number(result[id]) > 100) {
      result[id] = '100';
    }
    if (id === maxId && Number(result[id]) < Number(values[minId])) {
      result['temp'] = result[minId];
      result[minId] = result[maxId];
      result[maxId] = result['temp'];
    } else if (id === minId && Number(result[id]) > Number(values[maxId])) {
      result['temp'] = result[minId];
      result[minId] = result[maxId];
      result[maxId] = result['temp'];
    }

    result[minId] = String(Number(result[minId]));
    result[maxId] = String(Number(result[maxId]));

    setValues(result);
  };

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
            onBlur={handleBlur}
          />
          ~
          <Input
            id={maxId}
            type="number"
            min={0}
            max={100}
            value={values[maxId]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <Slider
          id={id}
          value={[Number(values[minId]), Number(values[maxId])]}
          onValueChange={value => {
            setValues({ ...values, [minId]: value[0], [maxId]: value[1] });
          }}
        />
      </div>
    </Field>
  );
};

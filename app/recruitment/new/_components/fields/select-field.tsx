import { PropsWithChildren, useContext } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '~/components/select';

interface SelectFieldItemProps {
  items: string[];
}
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

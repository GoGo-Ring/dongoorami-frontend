import { PropsWithChildren, useContext } from 'react';

import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import ErrorText from '~/components/error-text';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '~/components/select';
import { UseFormReturn } from '~/hooks/useForm/types';

interface SelectFieldItemProps {
  items: string[];
}

interface SelectFieldProps<K extends string> extends FieldProps {
  id: K;
  placeholder: string;
}
export const SelectField = <
  K extends GetKeysValueOf<CompanionFormValue, string>,
>({
  id,
  placeholder,
  label,
  variant,
  children,
}: PropsWithChildren<SelectFieldProps<K>>) => {
  const { values, handleValueChange, errors } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

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
      <ErrorText message={errors[id]} />
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

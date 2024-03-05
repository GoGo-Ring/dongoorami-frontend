import { PropsWithChildren, useContext } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';
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

import { PropsWithChildren, useContext } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';
import { UseFormReturn } from '~/hooks/useForm/types';

interface RadioGroupFieldProps<K extends string>
  extends PropsWithChildren<FieldProps> {
  id: K;
}

export const RadioGroupField = <
  K extends GetKeysValueOf<CompanionFormValue, string>,
>({
  id,
  label,
  children,
  variant,
}: RadioGroupFieldProps<K>) => {
  const { handleValueChange, values, errors } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

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

export const RadioGroupFieldItem = ({
  id,
  label,
}: RadioGroupFieldProps<GetKeysValueOf<CompanionFormValue, string>>) => {
  return (
    <Field id={id} label={label} labelVariant="radio" variant="radio">
      <RadioGroupItem value={id} id={id} />
    </Field>
  );
};

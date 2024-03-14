import { useContext } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import { Input } from '~/components/input';
import { UseFormReturn } from '~/hooks/useForm/types';

interface InputFieldProps<K extends string>
  extends FieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  id: K;
}

export const InputField = <
  K extends GetKeysValueOf<CompanionFormValue, string>,
>({
  id,
  placeholder,
  label,
  variant,
}: InputFieldProps<K>) => {
  const { values, handleChange, errors } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

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

import { useContext } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { Input } from '~/components/input';

interface InputFieldProps
  extends FieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const InputField = ({
  id,
  placeholder,
  label,
  variant,
}: InputFieldProps) => {
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

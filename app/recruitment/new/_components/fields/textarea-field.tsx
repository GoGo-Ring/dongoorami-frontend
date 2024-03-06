import { useContext } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { Textarea } from '~/components/textarea';

export const TextareaField = ({
  id,
  placeholder,
  variant,
  className,
  labelClassName,
}: FieldProps) => {
  const { values, handleChange, errors } = useContext(FormContext);

  return (
    <Field
      id={id}
      variant={variant}
      className={className}
      labelClassName={labelClassName}
    >
      <Textarea
        id={id}
        className="h-96 resize-none"
        placeholder={placeholder}
        value={values[id]}
        onChange={handleChange}
      />
      <Error error={errors[id]} />
    </Field>
  );
};

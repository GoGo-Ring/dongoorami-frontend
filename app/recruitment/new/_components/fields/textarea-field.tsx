import { useContext } from 'react';

import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import ErrorText from '~/components/error-text';
import { Textarea } from '~/components/textarea';
import { UseFormReturn } from '~/hooks/useForm/types';

interface TextareaFieldProps<K extends string> extends FieldProps {
  id: K;
}

export const TextareaField = <
  K extends GetKeysValueOf<CompanionFormValue, string>,
>({
  id,
  placeholder,
  variant,
  className,
  labelClassName,
}: TextareaFieldProps<K>) => {
  const { values, handleChange, errors } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

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
      <ErrorText message={errors[id]} />
    </Field>
  );
};

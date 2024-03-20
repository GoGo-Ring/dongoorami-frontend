import { useContext } from 'react';

import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import { Checkbox } from '~/components/checkbox';
import ErrorText from '~/components/error-text';
import { UseFormReturn } from '~/hooks/useForm/types';

interface CheckBoxFieldProps<K extends string> extends FieldProps {
  id: K;
  items: string[];
}
export const CheckBoxField = <
  K extends GetKeysValueOf<CompanionFormValue, string[]>,
>({
  id,
  items,
  label,
  variant,
}: CheckBoxFieldProps<K>) => {
  const { handleValueChange, errors, values } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    handleValueChange(id)(
      checked ? [...values[id], name] : values[id].filter(v => v !== name),
    );
  };

  return (
    <Field id={id} label={label} variant={variant}>
      <ul className="flex w-fit">
        {items?.map(item => (
          <Field
            id={item}
            key={item}
            label={item}
            variant="radio"
            labelVariant="radio"
          >
            <Checkbox
              key={item}
              id={item}
              checked={values[id].includes(item)}
              onCheckedChange={handleCheckboxChange(item)}
            >
              {item}
            </Checkbox>
          </Field>
        ))}
      </ul>
      <ErrorText message={errors[id]} />
    </Field>
  );
};

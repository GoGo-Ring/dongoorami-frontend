import { useContext } from 'react';

import { Slider } from '~/app/recruitment/new/_components/double-thumb-slider';
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

interface SliderFieldProps<K extends string> extends FieldProps {
  id: K;
  minId: string;
  maxId: string;
}

export const SliderField = <
  K extends GetKeysValueOf<CompanionFormValue, string>,
>({
  id,
  minId,
  maxId,
  label,
  variant,
}: SliderFieldProps<K>) => {
  const { values, errors, handleValueChange } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

  const [minValue, maxValue] = values[id].split('~').map(Number);

  return (
    <Field id={id} label={label} variant={variant}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            id={minId}
            type="number"
            min={0}
            max={100}
            value={minValue}
            onChange={({ currentTarget: { value } }) =>
              handleValueChange(id)(`${value}~${maxValue}`)
            }
          />
          ~
          <Input
            id={maxId}
            type="number"
            min={0}
            max={100}
            value={maxValue}
            onChange={({ currentTarget: { value } }) =>
              handleValueChange(id)(`${minValue}~${value}`)
            }
          />
        </div>
        <Slider
          id={id}
          value={[
            Number(values[id].split('~')[0]),
            Number(values[id].split('~')[1]),
          ]}
          onValueChange={([minValue, maxValue]) =>
            handleValueChange(id)(`${minValue}~${maxValue}`)
          }
        />
      </div>
      <Error error={errors[id]} />
    </Field>
  );
};

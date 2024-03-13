import { useContext } from 'react';

import { Slider } from '~/app/recruitment/new/_components/double-thumb-slider';
import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { Input } from '~/components/input';

interface SliderFieldProps extends FieldProps {
  minId: string;
  maxId: string;
}

export const SliderField = ({
  id,
  minId,
  maxId,
  label,
  variant,
}: SliderFieldProps) => {
  const { values, errors, handleValueChange } = useContext(FormContext);

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

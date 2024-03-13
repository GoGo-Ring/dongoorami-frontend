import { useContext } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { Input } from '~/components/input';

interface CalendarFieldProps extends FieldProps {
  minId: string;
  maxId: string;
}

export const CalendarField = ({
  id,
  minId,
  maxId,
  label,
  variant,
}: CalendarFieldProps) => {
  const { values, errors, handleValueChange } = useContext(FormContext);

  const handleChange = ({
    target: { id: targetId, value: targetValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const [prevMinValue, prevMaxValue] = values[id].split('~');

    const newValue =
      targetId === minId
        ? `${targetValue}~${prevMaxValue}`
        : `${prevMinValue}~${targetValue}`;

    handleValueChange(id)(newValue);
  };

  const getValue = (targetId: string) => {
    const index = targetId === minId ? 0 : 1;

    if (!values[id]) {
      return '';
    }

    return values[id].split('~')[index];
  };

  return (
    <Field id={id} label={label} variant={variant}>
      <div className="flex gap-2">
        <Input
          id={minId}
          className="w-fit"
          type="date"
          value={getValue(minId)}
          onChange={handleChange}
        />
        <Input
          id={maxId}
          className="w-fit"
          type="date"
          value={getValue(maxId)}
          onChange={handleChange}
        />
      </div>
      <Error error={errors[id]} />
    </Field>
  );
};

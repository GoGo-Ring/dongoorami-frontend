import { useRef, useState } from 'react';

import {
  Errors,
  HandleChange,
  HandleSliderValueChange,
  HandleSubmit,
  HandleValueChange,
  RegisterValidation,
  UseFormReturn,
  UpdateField,
  ValidationRules,
  HandleSliderInputChange,
} from './types';

const useForm = <T extends Record<string, string>>(
  initialValues: T,
  onSubmit: (values: T) => void,
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({} as Errors<T>);
  const validationRules = useRef<ValidationRules<T>>({} as ValidationRules<T>);

  const updateField: UpdateField<T> = newValues => {
    setValues(prevValues => ({
      ...prevValues,
      ...newValues,
    }));

    Object.entries(newValues).forEach(([id, value]) => {
      if (!validationRules.current[id]) {
        return;
      }

      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: Object.entries(validationRules.current[id]).reduce(
          (acc, [message, validate]) => {
            return validate(value, newValues) ? acc : message;
          },
          '',
        ),
      }));
    });
  };

  const handleChangeField = (newValues: Partial<T>) => {
    updateField(newValues as T);
  };

  const handleChange: HandleChange = ({ currentTarget: { id, value } }) => {
    const newValues = {
      [id]: value,
    };

    updateField(newValues as T);
  };

  const handleValueChange: HandleValueChange<T> = id => value => {
    const newValues = {
      [id]: value,
    };

    updateField(newValues as T);
  };

  const handleSliderInputChange: HandleSliderInputChange<T> =
    ({ id, minId, maxId }) =>
    ({ currentTarget: { id: targetId, value } }) => {
      if (!validationRules.current[id]) {
        return;
      }

      const newValues = {
        [minId]: targetId === minId ? value : values[minId],
        [maxId]: targetId === maxId ? value : values[maxId],
        [id]:
          targetId === minId
            ? `${value}-${values[maxId]}`
            : `${values[minId]}~${value}`,
      };

      updateField(newValues as T);
    };

  const handleSliderValueChange: HandleSliderValueChange<T> =
    ({ id, minId, maxId }) =>
    ([minValue, maxValue]) => {
      if (!validationRules.current[id]) {
        return;
      }

      const newValues = {
        [minId]: minValue,
        [maxId]: maxValue,
        [id]: `${minValue}~${maxValue}`,
      };

      updateField(newValues as T);
    };

  const handleSubmit: HandleSubmit = e => {
    e.preventDefault();

    const newErrors = Object.entries(validationRules.current).reduce(
      (acc, [id, rules]) => {
        const value = values[id];
        const error = Object.entries(rules).reduce(
          (errorAcc, [message, validate]) => {
            return validate(value, values) ? errorAcc : message;
          },
          '',
        );

        return {
          ...acc,
          [id]: error,
        };
      },
      {} as Errors<T>,
    );

    if (!Object.keys(newErrors).length) {
      onSubmit(values);

      return;
    }

    setErrors(newErrors);
  };

  const registerValidation: RegisterValidation<T> = ({
    id,
    message,
    validate,
  }) => {
    validationRules.current[id] = {
      ...validationRules.current[id],
      [message]: validate,
    };
  };

  return {
    values,
    errors,
    setValues,
    handleChange,
    handleChangeField,
    handleValueChange,
    handleSubmit,
    handleSliderInputChange,
    handleSliderValueChange,
    registerValidation,
  };
};

export default useForm;

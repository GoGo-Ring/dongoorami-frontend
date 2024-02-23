import { useRef, useState } from 'react';

import {
  Errors,
  ValidateField,
  ValidateForm,
  HandleChange,
  HandleSliderValueChange,
  HandleSubmit,
  HandleValueChange,
  RegisterValidation,
  UseFormReturn,
  UpdateField,
  ValidationRules,
} from './types';

const useForm = <T extends Record<string, string>>(
  initialValues: T,
  onSubmit: (values: T) => void,
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({} as Errors<T>);
  const validationRules = useRef<ValidationRules<T>>({} as ValidationRules<T>);

  const validateField: ValidateField<T> = (id, value) => {
    const rules = validationRules.current[id] || {};

    return Object.keys(rules).reduce<string[]>((acc, message) => {
      if (!rules[message](value)) {
        acc.push(message);
      }

      return acc;
    }, []);
  };

  const validateForm: ValidateForm<T> = () => {
    return Object.keys(validationRules.current).reduce<Errors<T>>(
      (acc, key: keyof T) => {
        const fieldErrors = validateField(key, values[key]);

        if (fieldErrors.length > 0) {
          acc[key] = fieldErrors;
        }

        return acc;
      },
      {} as Errors<T>,
    );
  };

  const updateField: UpdateField<T> = (id, value) => {
    setValues(prevValues => ({ ...prevValues, [id]: value }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: validateField(id, value),
    }));
  };

  const handleChange: HandleChange = ({ currentTarget: { id, value } }) => {
    updateField(id, value);
  };

  const handleValueChange: HandleValueChange<T> = id => value => {
    updateField(id, value);
  };

  const handleSliderValueChange: HandleSliderValueChange<T> =
    (minId, maxId) =>
    ([minValue, maxValue]) => {
      updateField(minId, String(minValue));
      updateField(maxId, String(maxValue));
    };

  const handleSubmit: HandleSubmit = e => {
    e.preventDefault();
    const newErrors = validateForm();

    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      onSubmit(values);
    }
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
    handleValueChange,
    handleSubmit,
    handleSliderValueChange,
    registerValidation,
  };
};

export default useForm;

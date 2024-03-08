'use client';

import { useRef, useState } from 'react';

import {
  Errors,
  ValidateField,
  ValidateForm,
  HandleChange,
  HandleSubmit,
  HandleValueChange,
  RegisterValidation,
  UseFormReturn,
  UpdateField,
  ValidationRules,
  ValidateFn,
  InputType,
} from './types';

interface useFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationRulesList?: {
    id: keyof T;
    validate: ValidateFn;
    message: string;
  }[];
}

const useForm = <T extends Record<string, string>>({
  initialValues,
  onSubmit,
  validationRulesList = [],
}: useFormProps<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({} as Errors<T>);
  const validationRules = useRef<ValidationRules<T>>({} as ValidationRules<T>);

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

  validationRulesList.forEach(({ id, validate, message }) => {
    registerValidation({ id, validate, message });
  });

  const validateField: ValidateField<T> = (id, value, values) => {
    const rulesAboutId = validationRules.current[id] || {};

    return Object.keys(rulesAboutId).reduce<string>((acc, message) => {
      const validate = rulesAboutId[message];

      if (!validate(value, values)) {
        return `${acc}${message}`;
      }

      return acc;
    }, '');
  };

  const validateForm: ValidateForm<T> = values =>
    Object.keys(validationRules.current).reduce<Errors<T>>(
      (acc, id: keyof T) => {
        const fieldErrors = validateField(id, values[id], values);

        if (fieldErrors.length > 0) {
          acc[id] = fieldErrors;
        }

        return acc;
      },
      {} as Errors<T>,
    );

  const updateField: UpdateField<T> = (id, value) => {
    setValues(prevValues => ({ ...prevValues, [id]: value }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: validateField(id, value, values),
    }));
  };

  const handleChange: HandleChange = ({ currentTarget: { id, value } }) => {
    updateField(id, value);
  };

  const handleValueChange: HandleValueChange<T> = id => value => {
    updateField(id, String(value));
  };

  const handleSubmit: HandleSubmit = e => {
    e.preventDefault();
    const newErrors = validateForm(values);

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === '')) {
      onSubmit(values);
      setValues(initialValues);
    }
  };

  const handleUnContolledSubmit: HandleSubmit = e => {
    e.preventDefault();

    const ids = Object.keys(initialValues);
    const values = ids.reduce((acc, id) => {
      const element = document.getElementById(id as string) as InputType;

      return { ...acc, [id]: element.value };
    }, {} as T);
    const newErrors = validateForm(values);

    setErrors(newErrors);
    if (Object.values(newErrors).every(error => error === '')) {
      onSubmit(values);
      ids.forEach(id => {
        const element = document.getElementById(id as string) as InputType;

        element.value = initialValues[id];
      });
    }
  };

  return {
    values,
    errors,
    setValues,
    handleChange,
    handleValueChange,
    handleSubmit,
    registerValidation,
    handleUnContolledSubmit,
  };
};

export default useForm;

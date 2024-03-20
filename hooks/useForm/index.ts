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

interface useFormProps<T, K, V> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationRulesList?: {
    id: K;
    validate: ValidateFn<T, V>;
    message: string;
  }[];
}

const useForm = <T extends object, K extends Extract<keyof T, string>>({
  initialValues,
  onSubmit,
  validationRulesList = [],
}: useFormProps<T, K, T[K]>): UseFormReturn<T, K> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors>({} as Errors);
  const validationRules = useRef<ValidationRules<T, K, T[K]>>(
    {} as ValidationRules<T, K, T[K]>,
  );

  const registerValidation: RegisterValidation<T, K, T[K]> = ({
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

  const validateField: ValidateField<T, K, T[K]> = (id, value, values) => {
    const rulesAboutId = validationRules.current[id] || {};

    return (
      Object.keys(rulesAboutId).find(message => {
        const validate = rulesAboutId[message];

        return !validate(value, values) ? message : '';
      }) || ''
    );
  };

  const validateForm: ValidateForm<T> = values => {
    const errors = {} as Errors;

    for (const id in validationRules.current) {
      const fieldErrors = validateField(id, values[id], values);

      if (fieldErrors.length > 0) {
        errors[id] = fieldErrors;
      }
    }

    return errors;
  };

  const updateField: UpdateField<K, T[K]> = (id, value) => {
    setValues(prevValues => ({ ...prevValues, [id]: value }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: validateField(id, value, values),
    }));
  };

  const handleChange: HandleChange = ({ currentTarget: { id, value } }) => {
    updateField(id as K, value as T[K]);
  };

  const handleValueChange: HandleValueChange<K, T[K]> = id => value => {
    updateField(id, value);
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

  const handleUnControlledSubmit: HandleSubmit = e => {
    e.preventDefault();

    const ids = Object.keys(initialValues) as K[];
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

        element.value = initialValues[id] as string;
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
    handleUnControlledSubmit,
  };
};

export default useForm;

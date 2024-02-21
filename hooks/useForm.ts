import React, { useState } from 'react';

type HandleChange = <
  E extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
>(
  e: React.ChangeEvent<E>,
) => void;

type HandleSubmit = (e: React.FormEvent) => void;

type UseForm = <T extends Record<string, string>>(
  initialValues: T,
  onSubmit: (values: T) => void,
) => {
  values: T;
  errors: Record<keyof T, boolean>;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  handleChange: HandleChange;
  handleSubmit: HandleSubmit;
};

const useForm: UseForm = <T>(
  initialValues: T,
  onSubmit: (values: T) => void,
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>,
  );

  const handleChange: HandleChange = e => {
    const { id, value } = e.currentTarget;

    if (!value) {
      setErrors({ ...errors, [id]: true });

      return;
    }
    setValues({ ...values, [id]: value });
    setErrors({ ...errors, [id]: false });
  };

  const handleSubmit: HandleSubmit = e => {
    e.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
  };
};

export default useForm;

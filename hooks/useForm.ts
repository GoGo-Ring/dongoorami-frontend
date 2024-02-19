import React, { useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

const useForm = <T extends Record<string, string>>({
  initialValues,
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>,
  );

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.currentTarget;

    if (!value) {
      setErrors({ ...errors, [id]: true });

      return;
    }
    setValues({ ...values, [id]: value });
    setErrors({ ...errors, [id]: false });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const getFieldProps = (id: string) => {
    return {
      value: values[id],
      onChange: handleChange,
    };
  };

  return {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    getFieldProps,
  };
};

export default useForm;

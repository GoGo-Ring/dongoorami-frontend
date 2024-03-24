import { ReactNode, createContext, useEffect } from 'react';

import useForm from '~/hooks/useForm';
import { UseFormReturn, ValidateFn } from '~/hooks/useForm/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormContext = createContext({} as UseFormReturn<any, any>);

FormContext.displayName = 'FormContext';

interface FormProps<T, K, V> {
  children: ReactNode;
  initialValues: T;
  initialValidations: {
    id: K;
    validate: ValidateFn<T, V>;
    message: string;
  }[];
  className?: string;
  submit: (values: T) => void;
}

export const Form = <T extends object, K extends Extract<keyof T, string>>({
  children,
  initialValues,
  initialValidations,
  className,
  submit,
}: FormProps<T, K, T[K]>) => {
  const formValues = useForm<T, K>({
    initialValues,
    onSubmit: submit,
    validationRulesList: initialValidations,
  });
  const { handleSubmit, registerValidation, setValues } = formValues;

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues, setValues]);

  initialValidations.forEach(registerValidation);

  return (
    <FormContext.Provider value={formValues}>
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

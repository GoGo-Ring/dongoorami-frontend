import { ReactNode, createContext } from 'react';

import { CompanionFormValue } from '~/app/recruitment/new/constants';
import useForm from '~/hooks/useForm';
import { UseFormReturn, ValidateFn } from '~/hooks/useForm/types';

export const FormContext = createContext(
  {} as UseFormReturn<CompanionFormValue>,
);

FormContext.displayName = 'FormContext';

interface FormProps<T> {
  children: ReactNode;
  initialValues: T;
  initialValidations: {
    id: string;
    validate: ValidateFn;
    message: string;
  }[];
  className?: string;
  submit: (values: T) => void;
}

export const Form = ({
  children,
  initialValues,
  initialValidations,
  className,
  submit,
}: FormProps<CompanionFormValue>) => {
  const formValues = useForm<CompanionFormValue>(initialValues, submit);
  const { handleSubmit, registerValidation } = formValues;

  initialValidations.forEach(registerValidation);

  return (
    <FormContext.Provider value={formValues}>
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

import { ReactNode, createContext } from 'react';

import useForm from '~/hooks/useForm';
import { ValidateFn } from '~/hooks/useForm/types';

export const FormContext = createContext({} as ReturnType<typeof useForm>);

FormContext.displayName = 'FormContext';

interface FormProps {
  children: ReactNode;
  initialValues: Record<string, string>;
  initialValidations: {
    id: string;
    validate: ValidateFn;
    message: string;
  }[];
  className?: string;
}

export const Form = ({
  children,
  initialValues,
  initialValidations,
  className,
}: FormProps) => {
  const formValues = useForm(initialValues, values => values);
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

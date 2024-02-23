import { ReactNode, createContext } from 'react';

import useForm from '~/hooks/useForm';

export const FormContext = createContext({} as ReturnType<typeof useForm>);

FormContext.displayName = 'FormContext';

interface FormProps {
  children: ReactNode;
  initialValues: Record<string, string>;
}

export const Form = ({ children, initialValues }: FormProps) => {
  const formValues = useForm(initialValues, values => values); // TODO: 제출 로직 추가
  const { handleSubmit } = formValues;

  return (
    <FormContext.Provider value={formValues}>
      <form
        className="flex w-[890px] flex-col justify-center gap-12"
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

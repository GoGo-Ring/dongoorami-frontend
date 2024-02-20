import { ReactNode, createContext } from 'react';

import useForm from '~/hooks/useForm';

import { INITIAL_VALUES } from '../../constants';

const INITIAL_RETURN_FORM_VALUES = {
  values: INITIAL_VALUES,
  errors: {} as Record<keyof typeof INITIAL_VALUES, boolean>,
  setValues: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
};

export const FormContext = createContext<
  ReturnType<typeof useForm<typeof INITIAL_VALUES>>
>(INITIAL_RETURN_FORM_VALUES);

FormContext.displayName = 'FormContext';

interface FormProps {
  children: ReactNode;
}

export const Form = ({ children }: FormProps) => {
  const formValues = useForm(INITIAL_VALUES, values => values); // TODO: 제출 로직 추가
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

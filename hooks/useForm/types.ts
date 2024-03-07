type InputType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type HandleChange = <
  E extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
>(
  e: React.ChangeEvent<E>,
) => void;
type HandleValueChange<T> = (id: keyof T) => (value: string | number) => void;

type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;

type Errors<T> = Record<keyof T, string>;

type ValidateFn = (value: string, values: Record<string, string>) => boolean;
type ValidateForm<T extends Record<string, string>> = (values: T) => Errors<T>;
type ValidateField<T> = (id: keyof T, value: string, values: T) => string;

type UpdateField<T> = (id: keyof T, value: string) => void;

type ValidationRules<T> = Record<keyof T, Record<string, ValidateFn>>;
type RegisterValidation<T> = (props: {
  id: keyof T;
  validate: ValidateFn;
  message: string;
}) => void;

type UseFormReturn<T> = {
  values: T;
  errors: Errors<T>;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  handleChange: HandleChange;
  handleValueChange: HandleValueChange<T>;
  handleUnContolledSubmit: HandleSubmit;
  handleSubmit: HandleSubmit;
  registerValidation: RegisterValidation<T>;
};

export type {
  HandleChange,
  HandleValueChange,
  HandleSubmit,
  Errors,
  ValidateFn,
  ValidateField,
  ValidateForm,
  UpdateField,
  RegisterValidation,
  ValidationRules,
  UseFormReturn,
  InputType,
};

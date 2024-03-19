type InputType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type HandleChange = <
  E extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
>(
  e: React.ChangeEvent<E>,
) => void;
type HandleValueChange<K, V> = (id: K) => (value: V) => void;

type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;

type Errors = Record<string, string>;

type ValidateFn<T, V> = (value: V, values: T) => boolean;
type ValidateForm<T> = (values: T) => Errors;
type ValidateField<T, K, V> = (id: K, value: V, values: T) => string;

type UpdateField<K, V> = (id: K, value: V) => void;

type ValidationRules<T, K extends Extract<keyof T, string>, V> = Record<
  K,
  Record<string, ValidateFn<T, V>>
>;
type RegisterValidation<T, K, V> = (props: {
  id: K;
  validate: ValidateFn<T, V>;
  message: string;
}) => void;

type UseFormReturn<T, K extends Extract<keyof T, string>> = {
  values: T;
  errors: Errors;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  handleChange: HandleChange;
  handleValueChange: HandleValueChange<K, T[K]>;
  handleUnControlledSubmit: HandleSubmit;
  handleSubmit: HandleSubmit;
  registerValidation: RegisterValidation<T, K, T[K]>;
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

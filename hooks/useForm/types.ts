type HandleChange = <
  E extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
>(
  e: React.ChangeEvent<E>,
) => void;
type HandleValueChange<T> = (id: keyof T) => (value: string) => void;
type HandleSliderValueChange<T> = (
  minId: keyof T,
  maxId: keyof T,
) => (value: number[]) => void;

type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;

type Errors<T> = Record<keyof T, string[]>;

type ValidateFn = (value: string) => boolean;
type ValidateField<T> = (id: keyof T, value: string) => string[];
type ValidateForm<T> = () => Errors<T>;
type UpdateField<T> = (id: keyof T, value: string) => void;

type RegisterValidation<T> = (
  id: keyof T,
  message: string,
  validate: ValidateFn,
) => void;

type ValidationRules<T> = Record<keyof T, Record<string, ValidateFn>>;

type UseFormReturn<T> = {
  values: T;
  errors: Errors<T>;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  handleChange: HandleChange;
  handleValueChange: HandleValueChange<T>;
  handleSubmit: HandleSubmit;
  handleSliderValueChange: HandleSliderValueChange<T>;
  registerValidation: RegisterValidation<T>;
};

export type {
  HandleChange,
  HandleValueChange,
  HandleSliderValueChange,
  HandleSubmit,
  Errors,
  ValidateFn,
  ValidateField,
  ValidateForm,
  UpdateField,
  RegisterValidation,
  ValidationRules,
  UseFormReturn,
};

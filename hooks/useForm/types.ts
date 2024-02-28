type HandleChange = <
  E extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
>(
  e: React.ChangeEvent<E>,
) => void;
type HandleValueChange<T> = (id: keyof T) => (value: string) => void;
type HandleSliderInputChange<T> = (props: {
  id: keyof T;
  minId: keyof T;
  maxId: keyof T;
}) => (e: React.ChangeEvent<HTMLInputElement>) => void;
type HandleSliderValueChange<T> = (props: {
  id: keyof T;
  minId: keyof T;
  maxId: keyof T;
}) => (value: number[]) => void;

type HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;

type Errors<T> = Record<keyof T, string>;

type ValidateFn = (value: string, values: Record<string, string>) => boolean;
type ValidateForm<T> = () => Errors<T>;
type UpdateField<T> = (newValues: Record<keyof T, string>) => void;

type RegisterValidation<T> = (props: {
  id: keyof T;
  validate: ValidateFn;
  message: string;
}) => void;

type ValidationRules<T> = Record<keyof T, Record<string, ValidateFn>>;

type UseFormReturn<T> = {
  values: T;
  errors: Errors<T>;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  handleChange: HandleChange;
  handleSliderInputChange: HandleSliderInputChange<T>;
  handleValueChange: HandleValueChange<T>;
  handleSubmit: HandleSubmit;
  handleSliderValueChange: HandleSliderValueChange<T>;
  registerValidation: RegisterValidation<T>;
};

export type {
  HandleChange,
  HandleValueChange,
  HandleSliderInputChange,
  HandleSliderValueChange,
  HandleSubmit,
  Errors,
  ValidateFn,
  ValidateForm,
  UpdateField,
  RegisterValidation,
  ValidationRules,
  UseFormReturn,
};

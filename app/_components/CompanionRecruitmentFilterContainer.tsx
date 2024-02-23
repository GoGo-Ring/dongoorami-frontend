'use client';
import {
  createContext,
  ChangeEvent,
  Children,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/select';

import { SEARCH } from './constants';

interface ItemProps {
  label?: string;
  value: string;
}

interface InputFieldProps {
  category: string;
  children: ReactNode;
  defaultValue: number[];
}

interface RadioFieldProps {
  category: string;
  children: ReactNode;
  defaultValue: string;
  handleState: (category: string, value: string) => void;
}

interface SelectFieldProps {
  category: string;
  children: ReactNode;
  defaultValue: number;
  placeholder: string;
  handleState: (category: string, value: string) => void;
}

const RadioItem = ({ label, value }: ItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={label} />
      <Label className="hover:cursor-pointer" htmlFor={label}>
        {label}
      </Label>
    </div>
  );
};

const RadioField = ({
  category,
  children,
  defaultValue,
  handleState,
}: RadioFieldProps) => {
  const [, setSelectedOption] = useState(defaultValue);
  const onValueChange = (value: string) => {
    handleState(category, value);
    setSelectedOption(value);
  };

  return (
    <div>
      <span className="font-semibold">{category}</span>
      <RadioGroup defaultValue={defaultValue} onValueChange={onValueChange}>
        {children}
      </RadioGroup>
    </div>
  );
};

interface InputItemProps {
  name: string;
}

interface InputFieldContextType {
  state: number[];
  onChange: (value: string, name: string) => void;
}

const InputFieldContext = createContext({} as InputFieldContextType);

const InputItem = ({ name }: InputItemProps) => {
  const { state, onChange } = useContext(InputFieldContext);

  const value = name === 'min' ? state[0] : state[1];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    onChange(value, name);
  };

  return (
    <Input
      type="number"
      className="w-16"
      min={0}
      max={100}
      name={name}
      onChange={handleChange}
      value={value}
    />
  );
};

const InputField = ({ category, children, defaultValue }: InputFieldProps) => {
  const [state, setState] = useState(defaultValue);
  const childrenArray = Children.toArray(children);

  if (childrenArray.length !== 2) {
    return null;
  }

  const [min, max] = childrenArray;
  const onChange = (value: string, name: string) => {
    if (name === 'min') {
      setState([parseInt(value), state[1]]);
    } else if (name === 'max') {
      setState([state[0], parseInt(value)]);
    }
  };

  return (
    <InputFieldContext.Provider value={{ state, onChange }}>
      <span className="font-semibold">{category}</span>
      <div className="flex flex-row gap-1">
        {min}
        <span className="my-auto ">~</span>
        {max}
      </div>
    </InputFieldContext.Provider>
  );
};

interface SelectOptionItemProps {
  value: number;
  label: string;
}

const SelectOptionItem = ({ value, label }: SelectOptionItemProps) => {
  const optionValue = value.toString();

  return <SelectItem value={optionValue}>{label}</SelectItem>;
};

const SelectField = ({
  category,
  children,
  defaultValue,
  placeholder,
  handleState,
}: SelectFieldProps) => {
  const [, setSelectedOption] = useState(defaultValue.toString());

  const onValueChange = (value: string) => {
    setSelectedOption(value);
    handleState(category, value);
  };

  return (
    <div>
      <span className="font-semibold">{category}</span>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

interface CompanionRecruitmentFilterContainerProps {
  children: ReactNode;
}

const CompanionRecruitmentFilterContainer = ({
  children,
}: CompanionRecruitmentFilterContainerProps) => {
  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      {children}
      <Button variant="outline" type="submit">
        {SEARCH}
      </Button>
    </div>
  );
};

CompanionRecruitmentFilterContainer.RadioField = RadioField;
CompanionRecruitmentFilterContainer.RadioItem = RadioItem;
CompanionRecruitmentFilterContainer.InputField = InputField;
CompanionRecruitmentFilterContainer.InputItem = InputItem;
CompanionRecruitmentFilterContainer.SelectField = SelectField;
CompanionRecruitmentFilterContainer.SelectOptionItem = SelectOptionItem;

export default CompanionRecruitmentFilterContainer;

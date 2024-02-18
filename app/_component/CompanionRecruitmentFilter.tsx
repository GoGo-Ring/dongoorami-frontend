import { Children, ReactNode } from 'react';

import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

interface ItemProps {
  label?: string;
  value: string;
}

interface FieldProps {
  category: string;
  children: ReactNode;
  defaultValue?: string;
  placeholder?: string;
}

const RadioItem = ({ label, value }: ItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{label}</Label>
    </div>
  );
};

const RadioField = ({ category, children, defaultValue }: FieldProps) => {
  return (
    <div>
      <span className="font-semibold">{category}</span>
      <RadioGroup defaultValue={defaultValue}>{children}</RadioGroup>
    </div>
  );
};

const InputItem = () => {
  return <Input type="number" className="w-16" />;
};

const InputField = ({ category, children }: FieldProps) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length !== 2) {
    return null;
  }

  const [min, max] = childrenArray;

  return (
    <div>
      <span className="font-semibold">{category}</span>
      <div className="flex flex-row gap-1">
        {min}
        <span className="my-auto ">~</span>
        {max}
      </div>
    </div>
  );
};

interface CompanionRecruitmentFilterProps {
  children: ReactNode;
}

const CompanionRecruitmentFilter = ({
  children,
}: CompanionRecruitmentFilterProps) => {
  return (
    <div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

CompanionRecruitmentFilter.RadioField = RadioField;
CompanionRecruitmentFilter.RadioItem = RadioItem;
CompanionRecruitmentFilter.InputField = InputField;
CompanionRecruitmentFilter.InputItem = InputItem;

export default CompanionRecruitmentFilter;

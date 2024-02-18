import { ReactNode } from 'react';

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

const InputField = ({ category }: FieldProps) => {
  return (
    <div>
      <span className="font-semibold">{category}</span>
      <div className="flex flex-row gap-1">
        <span className="my-auto ">~</span>
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

export default CompanionRecruitmentFilter;

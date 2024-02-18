import { ReactNode } from 'react';

import { RadioGroup } from '~/components/radio-group';

interface FieldProps {
  category: string;
  children: ReactNode;
  defaultValue?: string;
  placeholder?: string;
}

const RadioField = ({ category, children, defaultValue }: FieldProps) => {
  return (
    <div>
      <span className="font-semibold">{category}</span>
      <RadioGroup defaultValue={defaultValue}>{children}</RadioGroup>
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

export default CompanionRecruitmentFilter;

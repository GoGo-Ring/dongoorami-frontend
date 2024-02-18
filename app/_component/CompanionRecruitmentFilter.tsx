import { ReactNode } from 'react';

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

export default CompanionRecruitmentFilter;

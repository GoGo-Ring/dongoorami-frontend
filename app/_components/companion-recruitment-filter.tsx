'use client';
import { ReactNode } from 'react';

import { Button } from '~/components/button';

import { SEARCH } from './constants';

interface CompanionRecruitmentFilterProps {
  children: ReactNode;
}

const CompanionRecruitmentFilter = ({
  children,
}: CompanionRecruitmentFilterProps) => {
  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      {children}
      <Button variant="outline" type="submit">
        {SEARCH}
      </Button>
    </div>
  );
};

export default CompanionRecruitmentFilter;

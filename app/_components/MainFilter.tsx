'use client';
import { useRouter } from 'next/navigation';

import CompanionRecruitmentFilter from './companion-recruitment-filter';

interface FilterTabsProps {
  baseUrl?: string;
  className?: string;
  hasFilterTitle?: boolean;
}

const MainFilter = ({ baseUrl = 'search' }: FilterTabsProps) => {
  const router = useRouter();

  const onSubmit = (query: string) => {
    router.push(`/${baseUrl}?${query}`);
  };

  return (
    <div className="border  sm:hidden">
      <div className="sticky top-[50px] flex h-[900px] w-[220px] justify-center p-8">
        <CompanionRecruitmentFilter onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default MainFilter;

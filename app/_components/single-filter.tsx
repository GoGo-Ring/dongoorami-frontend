'use client';
import { useRouter } from 'next/navigation';

import Icon from '~/components/icon';

import CompanionRecruitmentFilter from './companion-recruitment-filter';

interface SingleFilterProps {
  baseUrl?: string;
  hasFilterTitle?: boolean;
}

const SingleFilter = ({
  baseUrl = '/',
  hasFilterTitle = true,
}: SingleFilterProps) => {
  const router = useRouter();

  const onSubmit = (query: string) => {
    router.push(`/${baseUrl}?${query}`);
  };

  return (
    <div className="flex w-[300px] flex-col gap-3">
      {hasFilterTitle && (
        <div className="flex gap-3 p-3">
          <Icon iconName="filter" />
          <span>필터</span>
        </div>
      )}
      <CompanionRecruitmentFilter onSubmit={onSubmit} />
    </div>
  );
};

export default SingleFilter;

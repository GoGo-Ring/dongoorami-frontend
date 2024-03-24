'use client';
import { useRouter } from 'next/navigation';

import Icon from '~/components/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';
import { cn } from '~/libs/utils';

import CompanionRecruitmentFilter from './companion-recruitment-filter';
import PerformanceFilter from './performance-filter';

interface FilterTabsProps {
  baseUrl?: string;
  className?: string;
  hasFilterTitle?: boolean;
  handleSubmit?: () => void;
}

const FilterTabs = ({
  baseUrl = 'search',
  hasFilterTitle = true,
  className = '',
  handleSubmit,
}: FilterTabsProps) => {
  const router = useRouter();

  const onSubmit = (query: string) => {
    router.push(`/${baseUrl}?${query}`);
    if (handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <div className={cn('flex w-[300px] flex-col gap-3', className)}>
      {hasFilterTitle && (
        <div className="flex gap-3 p-3">
          <Icon iconName="filter" />
          <span>필터</span>
        </div>
      )}
      <Tabs defaultValue="performance" className="w-[260px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performance">공연</TabsTrigger>
          <TabsTrigger value="accompany">동행 구인</TabsTrigger>
        </TabsList>
        <TabsContent value="performance">
          <PerformanceFilter onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value="accompany">
          <CompanionRecruitmentFilter onSubmit={onSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilterTabs;

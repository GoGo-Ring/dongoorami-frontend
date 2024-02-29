'use client';
import { useRouter } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';

import CompanionRecruitmentFilter from './companion-recruitment-filter';
import PerformanceFilter from './performance-filter';

interface FilterTabsProps {
  baseUrl?: string;
}

const FilterTabs = ({ baseUrl = 'search' }: FilterTabsProps) => {
  const router = useRouter();

  const onSubmit = (query: string) => {
    router.push(`/${baseUrl}?${query}`);
  };

  return (
    <Tabs defaultValue="performance" className="w-[300px]">
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
  );
};

export default FilterTabs;

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';

import CompanionRecruitmentFilter from './companion-recruitment-filter';
import PerformanceFilter from './performance-filter';

const FilterTabs = () => {
  const onSubmit = () => {};

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

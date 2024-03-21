'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import FilterTabs from '~/app/_components/filter-tabs';
import { Button } from '~/components/button';
import Icon from '~/components/icon';
import { Sheet, SheetContent, SheetTrigger } from '~/components/sheet';
import useInfiniteAccompanies from '~/hooks/infinite/useInfiniteAccompanies';
import { useInfinitePerformances } from '~/hooks/infinite/useInfinitePerformances';

import CompanionRecruitmentList from './companion-recruitment-list';
import PerformanceInfoList from './performance-info-list';

const FilterSearch = () => {
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const {
    data: accompaniesData,
    fetchNextPage: fetchNextAccompaniesPage,
    hasNextPage: hasNextPageCompanion,
  } = useInfiniteAccompanies(params);
  const {
    data: performancesData,
    fetchNextPage: fetchNextPerformancesPage,
    hasNextPage: hasNextPagePerformance,
  } = useInfinitePerformances(params);

  const [isMoreCompanionInfinite, setIsMoreCompanionInfinite] = useState(false);
  const [isMorePerformanceInfinite, setIsMorePerformanceInfinite] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFetchNextPage = () => {
    fetchNextAccompaniesPage();
  };

  const handleFetchNextPerformancesPage = () => {
    fetchNextPerformancesPage();
  };

  const handleIsMoreCompanion = () => {
    setIsMoreCompanionInfinite(true);
  };

  const handleIsMorePerformance = () => {
    setIsMorePerformanceInfinite(true);
  };

  const handleSubmit = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsMoreCompanionInfinite(false);
    setIsMorePerformanceInfinite(false);
  }, [params]);

  return (
    <div className="relative flex h-fit w-full">
      <div className=" box-border py-5">
        <div className="fixed bottom-5 right-5 rounded-full border-solid border-gray-250 bg-white sm:block">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <div className="fixed bottom-5 left-5 hidden sm:block">
                <Icon
                  className="cursor-pointer"
                  size="large"
                  iconName="filter"
                />
              </div>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex w-full justify-center ">
                <FilterTabs handleSubmit={handleSubmit} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <FilterTabs className="sticky top-24 sm:hidden" />
      </div>
      <div className="flex shrink-0 flex-col gap-8 py-10 sm:w-full md:w-[400px] lg:w-[700px]">
        {performancesData && (
          <PerformanceInfoList
            data={performancesData}
            isInfinite={isMorePerformanceInfinite}
            hasNextPage={hasNextPagePerformance}
            handleFetchNextPage={handleFetchNextPerformancesPage}
          />
        )}
        {!isMorePerformanceInfinite && (
          <Button
            variant="outline"
            onClick={handleIsMorePerformance}
            disabled={isMorePerformanceInfinite}
          >
            공연 더보기
          </Button>
        )}
        {accompaniesData && (
          <CompanionRecruitmentList
            data={accompaniesData}
            isInfinite={isMoreCompanionInfinite}
            hasNextPage={hasNextPageCompanion}
            handleFetchNextPage={handleFetchNextPage}
          />
        )}
        {!isMoreCompanionInfinite && (
          <Button
            variant="outline"
            onClick={handleIsMoreCompanion}
            disabled={isMoreCompanionInfinite}
          >
            동행 모집 더보기
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSearch;

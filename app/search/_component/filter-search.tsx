'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import FilterTabs from '~/app/_components/filter-tabs';
import { Button } from '~/components/button';
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

  useEffect(() => {
    setIsMoreCompanionInfinite(false);
    setIsMorePerformanceInfinite(false);
  }, [params]);

  return (
    <div className="relative flex  h-fit">
      <div className=" box-border py-5">
        <FilterTabs className="sticky top-24" />
      </div>
      <div className="flex shrink-0 flex-col gap-8 py-10 sm:w-[328px] md:w-[400px] lg:w-[700px]">
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

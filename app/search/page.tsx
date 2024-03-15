'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '~/components/button';
import useInfiniteAccompanies from '~/hooks/infinite/useInfiniteAccompanies';
import { useInfinitePerformances } from '~/hooks/infinite/useInfinitePerformances';

import CompanionRecruitmentList from './_component/companion-recruitment-list';
import PerformanceInfoList from './_component/performance-info-list';
import FilterTabs from '../_components/filter-tabs';

const Page = () => {
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const {
    data,
    fetchNextPage,
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
    fetchNextPage();
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
    <div className="flex">
      <div className="box-border py-5">
        <FilterTabs />
      </div>
      <div className="flex flex-col gap-8 px-6 py-10">
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
        {data && (
          <CompanionRecruitmentList
            data={data}
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

export default Page;

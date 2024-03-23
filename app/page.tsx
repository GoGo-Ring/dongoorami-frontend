'use client';

import { useEffect, useState } from 'react';

import { PerformanceInfoListItemApi } from '~/apis/scheme/performance';
import CompanionRecruitmentList from '~/app/search/_component/companion-recruitment-list';
import useInfiniteAccompanies from '~/hooks/infinite/useInfiniteAccompanies';
import { useFetchCarouselPerformances } from '~/hooks/queries/useFetchCarouselPerformances';

import MainFilter from './_components/MainFilter';
import MobileFilter from './_components/MobileFilter';
import StyledCarousel from './_components/StyledCarousel';

const Page = () => {
  const [performancesData, setPerformancesData] = useState<
    PerformanceInfoListItemApi[] | undefined
  >(undefined);

  const {
    data: accompaniesData,
    fetchNextPage: fetchNextAccompaniesPage,
    hasNextPage: hasNextPageCompanion,
  } = useInfiniteAccompanies('', 9);

  const { data } = useFetchCarouselPerformances();

  useEffect(() => {
    if (data) {
      setPerformancesData(data.concertGetShortResponses);
    }
  }, [data]);

  return (
    <div className="flex flex-col ">
      <div className="flex w-full  border">
        <StyledCarousel performances={performancesData} />
      </div>
      <div className="flex w-full border">
        <MainFilter />
        <div className="flex w-full flex-col justify-start gap-4 p-4">
          {accompaniesData && (
            <CompanionRecruitmentList
              data={accompaniesData}
              isInfinite={true}
              hasNextPage={hasNextPageCompanion}
              handleFetchNextPage={() => fetchNextAccompaniesPage()}
            />
          )}
        </div>
      </div>
      <MobileFilter />
    </div>
  );
};

export default Page;

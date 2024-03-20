'use client';

import { useEffect, useState } from 'react';

import { getPerformancesList } from '~/apis/performance';
import { PerformanceInfoListItemApi } from '~/apis/scheme/performance';
import CompanionRecruitmentList from '~/app/search/_component/companion-recruitment-list';
import useInfiniteAccompanies from '~/hooks/infinite/useInfiniteAccompanies';

import MainFilter from './_components/MainFilter';
import MobileFilter from './_components/MobileFilter';
import StyledCarousel from './_components/StyledCarousel';

const Page = () => {
  const [performancesData, setPerformancesData] = useState<
    PerformanceInfoListItemApi[] | null
  >(null);

  const {
    data: accompaniesData,
    fetchNextPage: fetchNextAccompaniesPage,
    hasNextPage: hasNextPageCompanion,
  } = useInfiniteAccompanies('', 9);

  const fetchPerformances = async () => {
    const { concertGetShortResponses } = await getPerformancesList('', 6, 0);

    setPerformancesData(concertGetShortResponses);
  };

  useEffect(() => {
    fetchPerformances();
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="flex w-full  border">
        {performancesData && <StyledCarousel performances={performancesData} />}
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

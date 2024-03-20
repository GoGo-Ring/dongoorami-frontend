'use client';

import { useEffect, useState } from 'react';

import { getPerformancesList } from '~/apis/performance';
import { PerformanceInfoListItemApi } from '~/apis/scheme/performance';
import CompanionRecruitmentList from '~/app/search/_component/companion-recruitment-list';
import { Button } from '~/components/button';
import useInfiniteAccompanies from '~/hooks/infinite/useInfiniteAccompanies';

import MainFilter from './_components/MainFilter';
import MobileFilter from './_components/MobileFilter';
import StyledCarousel from './_components/StyledCarousel';

const Page = () => {
  const [isMoreCompanionInfinite, setIsMoreCompanionInfinite] = useState(false);
  const [performancesData, setPerformancesData] = useState<
    PerformanceInfoListItemApi[] | null
  >(null);

  const {
    data: accompaniesData,
    fetchNextPage: fetchNextAccompaniesPage,
    hasNextPage: hasNextPageCompanion,
  } = useInfiniteAccompanies('');

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
        {performancesData && <StyledCarousel datas={performancesData} />}
      </div>
      <div className="flex w-full border">
        <MainFilter />
        {accompaniesData && (
          <CompanionRecruitmentList
            data={accompaniesData}
            isInfinite={isMoreCompanionInfinite}
            hasNextPage={hasNextPageCompanion}
            handleFetchNextPage={() => fetchNextAccompaniesPage()}
          />
        )}
      </div>
      {!isMoreCompanionInfinite && (
        <Button
          variant="outline"
          onClick={() => setIsMoreCompanionInfinite(true)}
          disabled={isMoreCompanionInfinite}
        >
          동행 모집 더보기
        </Button>
      )}
      <MobileFilter />
    </div>
  );
};

export default Page;

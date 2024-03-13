'use client';

import { Button } from '~/components/button';
import useFetchCompanions from '~/hooks/queries/useFetchCompanions';
import useFetchPerformances from '~/hooks/queries/useFetchPerformances';

import PerformanceInfoCard from './_component/performance-info-card';
import CompanionRecruitmentCard from '../_components/CompanionRecruitmentCard';
import FilterTabs from '../_components/filter-tabs';

const Page = () => {
  const performancesQuery = useFetchPerformances();
  const companionsQuery = useFetchCompanions();

  return (
    <div className="flex">
      <div className="box-border py-5">
        <FilterTabs />
      </div>
      <div className="flex flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-6">
          <h3 className="font-semibold">공연</h3>
          <div className="mx-auto grid grid-cols-3">
            {performancesQuery?.data?.map(({ id, startDate, ...rest }) => (
              <PerformanceInfoCard
                key={id}
                startDate={new Date(startDate)}
                {...rest}
              />
            ))}
          </div>
        </div>
        <Button variant="outline">공연 더보기</Button>
        <div>
          <div className="flex flex-col gap-6">
            <span className="font-semibold">동행 모집</span>
            <div className="mx-auto grid grid-cols-3 gap-4">
              {companionsQuery?.data?.map(({ id, date, ...rest }) => (
                <CompanionRecruitmentCard
                  key={id}
                  date={new Date(date)}
                  {...rest}
                />
              ))}
            </div>
          </div>
        </div>
        <Button variant="outline">동행 모집 더보기</Button>
      </div>
    </div>
  );
};

export default Page;

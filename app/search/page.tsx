'use client';

import { Button } from '~/components/button';
import { useCompanion, usePerformances } from '~/hooks/queries/queries';

import PerformanceInfoCard from './_component/PerformanceInfoCard';
import CompanionRecruitmentCard from '../_components/CompanionRecruitmentCard';
import FilterTabs from '../_components/filter-tabs';

const Page = () => {
  const performancesQuery = usePerformances();
  const companionsQuery = useCompanion();

  return (
    <div className="flex">
      <div className="box-border py-5">
        <FilterTabs />
      </div>
      <div className="flex flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-6">
          <h3 className="font-semibold">공연</h3>
          <div className="mx-auto grid grid-cols-3">
            {performancesQuery?.data?.map(({ _id, ...rest }) => (
              <PerformanceInfoCard key={_id} {...rest} />
            ))}
          </div>
        </div>
        <Button variant="outline">공연 더보기</Button>
        <div>
          <div className="flex flex-col gap-6">
            <span className="font-semibold">동행 모집</span>
            <div className="mx-auto grid grid-cols-3 gap-4">
              {companionsQuery?.data?.map(({ _id, ...rest }) => (
                <CompanionRecruitmentCard key={_id} {...rest} />
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

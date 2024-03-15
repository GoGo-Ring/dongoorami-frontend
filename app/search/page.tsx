'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '~/components/button';
import useInfiniteAccompanies from '~/hooks/infinite/useInfiniteAccompanies';

import CompanionRecruitmentList from './_component/companion-recruitment-list';
import FilterTabs from '../_components/filter-tabs';

const Page = () => {
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const {
    data,
    fetchNextPage,
    hasNextPage: hasNextPageCompanion,
    isFetchingNextPage,
  } = useInfiniteAccompanies(params);
  const [isMoreCompanionInfinite, setIsMoreCompanionInfinite] = useState(false);

  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  const handleIsMoreCompanion = () => {
    setIsMoreCompanionInfinite(true);
  };

  return (
    <div className="flex">
      <div className="box-border py-5">
        <FilterTabs />
      </div>
      <div className="flex flex-col gap-8 px-6 py-10">
        <Button
          variant="outline"
          disabled={!hasNextPageCompanion || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          공연 더보기
        </Button>
        {data && (
          <CompanionRecruitmentList
            data={data}
            isInfinite={isMoreCompanionInfinite}
            hasNextPage={hasNextPageCompanion}
            handleFetchNextPage={handleFetchNextPage}
          />
        )}
        {/* {data?.pages?.map(page =>
            page.accompanyPostInfos.map(
              ({
                id,
                title,
                writer,
                createdAt,
                updatedAt,
                status,
                concertName,
                viewCount,
                commentCount,
                gender,
                totalPeople,
              }) => (
                <div className="h-96 w-40" key={id}>
                  <span>{id}</span>
                  <span>{title}</span>
                  <span>{writer}</span>
                  <span>{createdAt}</span>
                  <span>{updatedAt}</span>
                  <span>{status}</span>
                  <span>{concertName}</span>
                  <span>{viewCount}</span>
                  <span>{commentCount}</span>
                  <span>{gender}</span>
                  <span>{totalPeople}</span>
                </div>
              ),
            ),
          )} */}
        {
          <Button
            variant="outline"
            onClick={handleIsMoreCompanion}
            disabled={!hasNextPageCompanion}
          >
            동행 모집 더보기
          </Button>
        }
      </div>
    </div>
  );
};

export default Page;

'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import api from '~/apis';
import { AccompanyPostInfoList } from '~/apis/scheme/accompany';
import { Button } from '~/components/button';

import useIntersectionObsever from './_component/useIntersectionObserver';
import FilterTabs from '../_components/filter-tabs';

const Page = () => {
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['accompanies', params],
      queryFn: async ({ pageParam }): Promise<AccompanyPostInfoList> => {
        const { data } = await api.get<AccompanyPostInfoList>({
          url: `/accompanies/posts?${params}$_size=${pageParam}`,
        });

        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.hasNext ? allPage.length + 1 : undefined;
      },
    });
  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  useIntersectionObsever({ handleFetchNextPage, hasNextPage });

  return (
    <div className="flex">
      <div className="box-border py-5">
        <FilterTabs />
      </div>
      <div className="flex flex-col gap-8 px-6 py-10">
        <Button
          variant="outline"
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          공연 더보기
        </Button>
        <div className="mx-auto grid grid-cols-3">
          {data?.pages?.map(page =>
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
          )}
        </div>
        <Button variant="outline" onClick={handleFetchNextPage}>
          동행 모집 더보기
        </Button>
      </div>
    </div>
  );
};

export default Page;

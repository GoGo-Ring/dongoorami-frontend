'use client';

import { Button } from '~/components/button';

import PerformanceInfoCard from './_component/PerformanceInfoCard';
import CompanionRecruitmentCard from '../_components/CompanionRecruitmentCard';
import FilterTabs from '../_components/filter-tabs';
import { usePerformances } from '../queries';

const Page = () => {
  const performancesQuery = usePerformances();

  const accompanyList = [
    {
      _id: 11,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 12,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 13,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 14,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 15,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
  ];

  return (
    <div className="flex">
      <div className="box-border py-5">
        <FilterTabs />
      </div>
      <div className="flex flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-6">
          <span className="font-semibold">공연</span>
          <div className="mx-auto grid grid-cols-3">
            {performancesQuery?.data?.map(
              ({ id, posterSrc, title, facilityName, startDate, status }) => (
                <PerformanceInfoCard
                  key={id}
                  posterSrc={posterSrc}
                  title={title}
                  facilityName={facilityName}
                  // startDate={new Date()}
                  // status={'공연 중'}
                  startDate={startDate}
                  status={status}
                />
              ),
            )}
          </div>
        </div>
        <Button variant="outline">공연 더보기</Button>
        <div>
          <div className="flex flex-col gap-6">
            <span className="font-semibold">동행 모집</span>
            <div className="mx-auto grid grid-cols-3 gap-4">
              {accompanyList.map(
                ({
                  _id,
                  title,
                  concertName,
                  userId,
                  gender,
                  personCount,
                  viewCount,
                  commentsCount,
                  date,
                  status,
                }) => (
                  <CompanionRecruitmentCard
                    key={_id}
                    title={title}
                    concertName={concertName}
                    userId={userId}
                    gender={gender}
                    personCount={personCount}
                    viewCount={viewCount}
                    commentsCount={commentsCount}
                    date={date}
                    status={status}
                  />
                ),
              )}
            </div>
          </div>
        </div>
        <Button variant="outline">동행 모집 더보기</Button>
      </div>
    </div>
  );
};

export default Page;

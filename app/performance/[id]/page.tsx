'use client';
import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';
import useFetchAccompanyCommentList from '~/hooks/queries/useFetchAccompanyReviews';
import useFetchConcertReviews from '~/hooks/queries/useFetchConcertReviews';
import { useFetchConcerts } from '~/hooks/queries/useFetchConcerts';

import InfoItem from '../_components/info-item';
import InfoItemWithToggle from '../_components/info-item-with-button';
import PerformanceRecruitment from '../_components/performance-recruitment';
import { PerformanceReview } from '../_components/performance-review';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const Page = ({ params }: Props) => {
  const paramsId = params.id;

  const { data, isLoading } = useFetchConcerts(paramsId);
  const { data: performanceReviewList } = useFetchConcertReviews(paramsId);
  const { data: performanceRecruitmentList } = useFetchAccompanyCommentList({
    concertId: paramsId,
  });

  if (isLoading || !data) {
    return;
  }

  const {
    name,
    startedAt,
    endedAt,
    place,
    actor,
    crew,
    runtime,
    age,
    agency,
    host,
    management,
    cost,
    poster,
    summary,
    introductionImages,
    schedule,
    totalAccompanies,
    totalReviews,
  } = data;

  return (
    <div className="mx-auto mb-20 mt-8 flex flex-col gap-[54px] sm:w-[328px] md:w-[680px] lg:w-[890px]">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="flex items-center gap-14 sm:flex-col">
        <Image src={poster} width={300} height={400} alt={`${name} 포스터`} />
        <div className="flex w-full flex-col gap-4 px-3 pt-3">
          <InfoItem
            label={'장소'}
            className="sm:flex-col"
            contents={place}
            labelWidth={'w-[90px]'}
          />
          <InfoItem
            label={'공연기간'}
            className="sm:flex-col"
            contents={`${startedAt} ~ ${endedAt}`}
            labelWidth={'w-[90px]'}
          />
          <InfoItem
            label={'공연시간'}
            className="sm:flex-col"
            contents={runtime}
            labelWidth={'w-[90px]'}
          />
          <InfoItem
            label={'가격'}
            contents={cost}
            labelWidth={'w-[90px]'}
            direction="col"
          />
        </div>
      </div>
      <div>
        <Tabs defaultValue="information">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="information">공연 정보</TabsTrigger>
            <TabsTrigger value="recruitment">
              공연 구인 ({totalAccompanies})
            </TabsTrigger>
            <TabsTrigger value="review">관람 후기 ({totalReviews})</TabsTrigger>
          </TabsList>
          <TabsContent
            value="information"
            className="flex w-full flex-col gap-6 p-6"
          >
            <InfoItem
              label={'출연진'}
              className="flex-col gap-4 sm:gap-1"
              contents={actor}
              weight="semibold"
              contentGap={'gap-1'}
            />
            <InfoItemWithToggle
              label={'줄거리'}
              className="flex-col gap-4 sm:gap-1"
              contents={summary}
              weight="semibold"
              defaultText="더보기"
              toggledText="접기"
            />

            <div className="grid grid-cols-2 gap-6">
              <InfoItem
                label={'제작진'}
                className="flex-col gap-4 sm:gap-1"
                contents={crew}
                weight="semibold"
                contentGap={'gap-1'}
                size={'sm'}
              />
              <InfoItem
                label={'기획사'}
                className="flex-col gap-4 sm:gap-1"
                contents={agency}
                weight="semibold"
                contentGap={'gap-1'}
                size={'sm'}
              />
              <InfoItem
                label={'주최'}
                className="flex-col gap-4 sm:gap-1"
                contents={host}
                weight="semibold"
                contentGap={'gap-1'}
              />
              <InfoItem
                label={'주관'}
                className="flex-col gap-4 sm:gap-1"
                contents={management}
                weight="semibold"
                contentGap={'gap-1'}
              />
            </div>
            <InfoItem
              label={'공연 시간'}
              className="flex-col gap-4 sm:gap-1"
              contents={schedule}
              weight="semibold"
              direction="col"
            />
            <InfoItem
              label={'공연 관람 연령'}
              className="flex-col gap-4 sm:gap-1"
              contents={age}
              weight="semibold"
            />
            <div className="flex flex-col gap-4 sm:gap-1">
              <span className="text-xl font-semibold">공연 상세</span>
              {introductionImages.map(src => (
                <Image
                  key={src}
                  src={src}
                  width={840}
                  height={840}
                  alt={`${name} 포스터`}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recruitment">
            <div className="m-auto flex w-full flex-col justify-center gap-6">
              {performanceRecruitmentList?.accompanyPostConcertResponses.map(
                (performance, i) => (
                  <PerformanceRecruitment {...performance} key={i} />
                ),
              )}
            </div>
          </TabsContent>
          <TabsContent value="review">
            <div className="m-auto flex w-fit flex-col justify-center gap-6">
              {performanceReviewList?.concertReviewGetResponses.map(
                (review, i) => <PerformanceReview {...review} key={i} />,
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

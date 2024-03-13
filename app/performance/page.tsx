import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';

import InfoItem from './_components/info-item';
import InfoItemWithToggle from './_components/info-item-with-button';

const Page = () => {
  return (
    <div className="mx-auto mt-8 flex flex-col gap-[54px] sm:w-[328px] md:w-[680px] lg:w-[890px]">
      <h2 className="text-xl font-semibold">공연명</h2>
      <div className="flex items-center gap-14 sm:flex-col">
        <Image src={''} width={300} height={400} alt={`${'공연명'} 포스터`} />
        <div className="flex w-full flex-col gap-4 px-3 pt-3">
          <InfoItem
            label={'장소'}
            className="sm:flex-col"
            contents={'장소명 (위치)'}
            labelWidth={'w-[90px]'}
          />
          <InfoItem
            label={'공연기간'}
            className="sm:flex-col"
            contents={'2024.01.01 ~ 2024.01.01'}
            labelWidth={'w-[90px]'}
          />
          <InfoItem
            label={'공연시간'}
            className="sm:flex-col"
            contents={'90분'}
            labelWidth={'w-[90px]'}
          />
          <InfoItem
            label={'가격'}
            contents={[
              '30,000원',
              '30,000원',
              '30,000원',
              '30,000원',
              '30,000원',
            ]}
            labelWidth={'w-[90px]'}
            direction="col"
          />
        </div>
      </div>
      <div>
        <Tabs defaultValue="information">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="information">공연 정보</TabsTrigger>
            <TabsTrigger value="recruitment">공연 구인 ({0})</TabsTrigger>
            <TabsTrigger value="review">관람 후기 ({0})</TabsTrigger>
          </TabsList>
          <TabsContent
            value="information"
            className="flex w-full flex-col gap-6 p-6"
          >
            <InfoItem
              label={'출연진'}
              className="flex-col gap-4 sm:gap-1"
              contents={['출연진1', '출연진2', '출연진3']}
              weight="semibold"
              contentGap={'gap-1'}
            />
            <InfoItemWithToggle
              label={'줄거리'}
              className="flex-col gap-4 sm:gap-1"
              contents={
                '줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명줄거리 설명'
              }
              weight="semibold"
              defaultText="더보기"
              toggledText="접기"
            />

            <div className="grid grid-cols-2 gap-6">
              <InfoItem
                label={'제작진'}
                className="flex-col gap-4 sm:gap-1"
                contents={['제작진', '제작진', '제작진']}
                weight="semibold"
                contentGap={'gap-1'}
                size={'sm'}
              />
              <InfoItem
                label={'기획사'}
                className="flex-col gap-4 sm:gap-1"
                contents={['기획사', '기획사', '기획사']}
                weight="semibold"
                contentGap={'gap-1'}
                size={'sm'}
              />
              <InfoItem
                label={'주최'}
                className="flex-col gap-4 sm:gap-1"
                contents={'주최'}
                weight="semibold"
                contentGap={'gap-1'}
              />
              <InfoItem
                label={'주관'}
                className="flex-col gap-4 sm:gap-1"
                contents={'주관'}
                weight="semibold"
                contentGap={'gap-1'}
              />
            </div>
            <InfoItem
              label={'공연 시간'}
              className="flex-col gap-4 sm:gap-1"
              contents={[
                '화요일 ~ 금요일 (20:00)',
                '토요일 (20:00)',
                '화요일 ~ 금요일 (10:00)',
              ]}
              weight="semibold"
              direction="col"
            />
            <InfoItem
              label={'공연 관람 연령'}
              className="flex-col gap-4 sm:gap-1"
              contents={'만 12세 이상'}
              weight="semibold"
            />
            <div className="flex flex-col gap-4 sm:gap-1">
              <span className="text-xl font-semibold">공연 상세</span>
              <Image
                src={''}
                width={840}
                height={840}
                alt={`${'공연명'} 포스터`}
              />
            </div>
          </TabsContent>
          <TabsContent value="recruitment">
            <span>공연 구인</span>
          </TabsContent>
          <TabsContent value="review">
            <span>관람 후기</span>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

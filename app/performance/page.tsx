import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';

const Page = () => {
  return (
    <div className="mx-auto mt-8 flex flex-col gap-[54px] sm:w-[328px] md:w-[680px] lg:w-[890px]">
      <h2 className="text-xl font-semibold">공연명</h2>
      <div className="flex items-center gap-14 sm:flex-col">
        <Image src={''} width={300} height={400} alt={`${'공연명'} 포스터`} />
        <div className="flex w-full flex-col gap-4 px-3 pt-3">
          <div className="flex sm:flex-col">
            <span className="w-[90px] font-semibold">장소</span>
            <span>장소명 (장소명) (장소명)</span>
          </div>
          <div className="flex sm:flex-col">
            <span className="w-[90px] font-semibold">공연기간</span>
            <span>2024.01.01&nbsp;~&nbsp;2024.01.01</span>
          </div>
          <div className="flex sm:flex-col">
            <span className="w-[90px] font-semibold">공연시간</span>
            <span>90분</span>
          </div>
          <div className="flex">
            <span className="w-[90px] font-semibold">가격</span>
            <div className="flex flex-col">
              <span>30,000원</span>
              <span>30,000원</span>
              <span>30,000원</span>
              <span>30,000원</span>
              <span>30,000원</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultValue="information">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="information">공연 정보</TabsTrigger>
            <TabsTrigger value="recruitment">공연 구인 (0)</TabsTrigger>
            <TabsTrigger value="review">관람 후기 (0)</TabsTrigger>
          </TabsList>
          <TabsContent
            value="information"
            className="flex w-full flex-col gap-6 p-6"
          >
            <div className="flex flex-col gap-4 sm:gap-1">
              <span className="text-xl font-semibold">출연진</span>
              <div>
                <span>출연진1</span>
                <span>출연진2</span>
                <span>출연진3</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-1">
              <span className="text-xl font-semibold">줄거리</span>
              <div>
                <p>줄거리 설명</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4 sm:gap-1">
                <span className="text-xl font-semibold">제작진</span>
                <span>제작진</span>
              </div>
              <div className="flex flex-col gap-4 sm:gap-1">
                <span className="text-xl font-semibold">기획사</span>
                <span>기획사</span>
              </div>
              <div className="flex flex-col gap-4 sm:gap-1">
                <span className="text-xl font-semibold">주최</span>
                <span>주최</span>
              </div>
              <div className="flex flex-col gap-4 sm:gap-1">
                <span className="text-xl font-semibold">주관</span>
                <span>주관</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-1">
              <span className="text-xl font-semibold">공연 시간</span>
              <span>화요일 ~ 금요일 (20:00)</span>
              <span>토요일 (20:00)</span>
              <span>화요일 ~ 금요일 (10:00)</span>
            </div>
            <div className="flex flex-col gap-4 sm:gap-1">
              <span className="text-xl font-semibold">공연 관람 연령</span>
              <span>만 12세 이상</span>
            </div>
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
            <span>hi?</span>
          </TabsContent>
          <TabsContent value="review">
            <span>hi?</span>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

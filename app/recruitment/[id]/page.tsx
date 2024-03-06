'use client';
import Image from 'next/image';

import Field from '~/app/recruitment/[id]/_components/field';
import PostStatus from '~/app/recruitment/[id]/_components/post-status';
import Profile from '~/app/recruitment/[id]/_components/profile';
import Section from '~/app/recruitment/[id]/_components/section';
import useQueryCompanionPost from '~/hooks/queries/useQueryCompanionPost';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const Page = ({ params }: Props) => {
  const { data } = useQueryCompanionPost(params.id);
  const {
    memberInfo,
    updatedAt,
    waitingCount,
    viewCount,
    image,
    title,
    region,
    totalPeople,
    startDate,
    endDate,
    concertLocation,
    startAge,
    endAge,
    gender,
    transportation,
  } = data;

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="text-xl font-semibold">{data?.title}</div>
      <div className="flex items-center justify-between">
        <Profile name={memberInfo.nickname} image={memberInfo.profileImage} />
        <PostStatus
          createdAt={updatedAt} // TODO: CompanionDetail 에 createdAt 필드 추가
          waitingCount={waitingCount}
          viewCount={viewCount}
        />
      </div>
      {image && (
        <div className="flex justify-center">
          <Image src={image} alt="companion image" width={300} height={300} />
        </div>
      )}
      <Section>
        <div className="flex w-full flex-col">
          <Field label="공연명" value={title} />
          <Field label="지역" value={region} />
          <Field label="인원수" value={totalPeople} />
          <Field label="공연 날짜" value={`${startDate}~${endDate}`} />
        </div>
        <div className="flex w-full flex-col">
          <Field label="공연장소" value={concertLocation} />
          <Field label="연령" value={`${startAge}~${endAge}`} />
          <Field label="성별" value={gender} />
          <Field label="교통수단" value={transportation} />
        </div>
      </Section>
      <Section>{data?.content}</Section>
    </div>
  );
};

export default Page;

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

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="text-xl font-semibold">{data?.title}</div>
      <div className="flex items-center justify-between">
        <Profile
          name={data?.memberInfo.nickname}
          image={data?.memberInfo.profileImage}
        />
        <PostStatus
          createdAt={data?.updatedAt} // TODO: CompanionDetail 에 createdAt 필드 추가
          waitingCount={data?.waitingCount}
          viewCount={data?.viewCount}
        />
      </div>
      {data?.image && (
        <div className="flex justify-center">
          <Image
            src={data?.image}
            alt="companion image"
            width={300}
            height={300}
          />
        </div>
      )}
      <Section>
        <div className="flex w-full flex-col">
          <Field label="공연명" value={data?.title} />
          <Field label="지역" value={data?.region} />
          <Field label="인원수" value={data?.totalPeople} />
          <Field
            label="공연 날짜"
            value={`${data?.startDate}~${data?.endDate}`}
          />
        </div>
        <div className="flex w-full flex-col">
          <Field label="공연장소" value={data?.concertLocation} />
          <Field label="연령" value={`${data?.startAge}~${data?.endAge}`} />
          <Field label="성별" value={data?.gender} />
          <Field label="교통수단" value={data?.transportation} />
        </div>
      </Section>
      <Section>{data?.content}</Section>
    </div>
  );
};

export default Page;

'use client';
import Image from 'next/image';
import Link from 'next/link';

import AccompanyApply from '~/app/recruitment/[id]/_components/apply';
import { CommentSection } from '~/app/recruitment/[id]/_components/comment';
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
    status,
  } = data;

  const userId = 2; // TODO: 사용자 정보에서 가져오기

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="text-xl font-semibold">{data?.title}</div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Profile name={memberInfo.name} image={memberInfo.profileImage} />
          <PostStatus
            recruitStatus={status}
            createdAt={updatedAt} // TODO: CompanionDetail 에 createdAt 필드 추가
            waitingCount={waitingCount}
            viewCount={viewCount}
          />
        </div>
        <div className="divide-x-2 self-end text-base font-medium text-gray-400">
          <Link className="px-1" href={`/recruitment/new?id=${params.id}`}>
            수정
          </Link>
          <Link className="px-1" href="/recruitment/delete">
            삭제
          </Link>
        </div>
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

      <Section>
        <AccompanyApply count={2} userId={userId} />
      </Section>

      <Section>{data?.content}</Section>

      <CommentSection accompanyPostId={params.id} />
    </div>
  );
};

export default Page;

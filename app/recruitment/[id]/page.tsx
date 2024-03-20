'use client';
import Image from 'next/image';
import Link from 'next/link';

import AccompanyApply from '~/app/recruitment/[id]/_components/apply';
// import { CommentSection } from '~/app/recruitment/[id]/_components/comment';
import Field from '~/app/recruitment/[id]/_components/field';
import PostStatus from '~/app/recruitment/[id]/_components/post-status';
import Profile from '~/app/recruitment/[id]/_components/profile';
import Section from '~/app/recruitment/[id]/_components/section';
import Error from '~/app/recruitment/[id]/error';
import Loading from '~/app/recruitment/[id]/loading';
import useMutationDeleteCompanyPost from '~/hooks/mutations/useMutationDeleteCompanyPost';
import useFetchCompanionPost from '~/hooks/queries/useFetchCompanionPost';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const Page = ({ params }: Props) => {
  const { mutate: mutateDeletePost } = useMutationDeleteCompanyPost(params.id);
  const { data, isPending, isError, error, refetch } = useFetchCompanionPost(
    params.id,
    true,
  );

  if (isError) {
    return (
      <Error
        error={error}
        reset={() => {
          refetch();
        }}
      />
    );
  }

  if (!data || isPending) {
    return <Loading />;
  }

  const {
    status,
    createdAt,
    waitingCount,
    viewCount,
    memberProfile,
    images,
    title,
    concertName,
    region,
    totalPeople,
    startDate,
    endDate,
    concertPlace,
    startAge,
    endAge,
    gender,
    purposes,
  } = data;

  const userId = 2; // TODO: 사용자 정보에서 가져오기

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="text-xl font-semibold">{title}</div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Profile
            name={memberProfile.nickname}
            image={memberProfile.profileImage}
          />
          <PostStatus
            status={status}
            createdAt={createdAt}
            waitingCount={waitingCount}
            viewCount={viewCount}
          />
        </div>
        <div className="divide-x-2 self-end text-base font-medium text-gray-400">
          <Link className="px-1" href={`/recruitment/new?id=${params.id}`}>
            수정
          </Link>
          <Link
            className="px-1"
            href="/"
            onClick={() => {
              mutateDeletePost({ accompanyPostId: params.id });
            }}
          >
            삭제
          </Link>
        </div>
      </div>
      {images.map((image, index) => (
        <div className="flex justify-center" key={index}>
          <Image src={image} alt="companion image" width={300} height={300} />
        </div>
      ))}

      <Section>
        <div className="flex w-full flex-col">
          <Field label="공연명" value={concertName} />
          <Field label="지역" value={region} />
          <Field label="인원수" value={totalPeople} />
          <Field label="공연 날짜" value={`${startDate}~${endDate}`} />
        </div>
        <div className="flex w-full flex-col">
          <Field label="공연장소" value={concertPlace} />
          <Field label="연령" value={`${startAge}~${endAge}`} />
          <Field label="성별" value={gender} />
          <Field label="교통수단" value={purposes} />
        </div>
      </Section>

      <Section>
        <AccompanyApply count={2} userId={userId} />
      </Section>

      <Section>{data?.content}</Section>

      {/* <CommentSection accompanyPostId={params.id} /> */}
    </div>
  );
};

export default Page;

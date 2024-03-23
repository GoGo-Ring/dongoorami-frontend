'use client';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { ApplyForm } from '~/app/recruitment/[id]/_components/apply';
import ApplyList from '~/app/recruitment/[id]/_components/apply/list';
import { CommentSection } from '~/app/recruitment/[id]/_components/comment';
import Field from '~/app/recruitment/[id]/_components/field';
import PostStatus from '~/app/recruitment/[id]/_components/post-status';
import Profile from '~/app/recruitment/[id]/_components/profile';
import Section from '~/app/recruitment/[id]/_components/section';
import Error from '~/app/recruitment/[id]/error';
import Loading from '~/app/recruitment/[id]/loading';
import useMutationCloseCompanyStatus from '~/hooks/mutations/useMutationCloseCompanyStatus';
import useMutationCreateCompanyComment from '~/hooks/mutations/useMutationCreateCompanyComment';
import useMutationDeleteCompanyPost from '~/hooks/mutations/useMutationDeleteCompanyPost';
import useFetchComments from '~/hooks/queries/useFetchComments';
import useFetchCompanionPost from '~/hooks/queries/useFetchCompanionPost';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const Page = ({ params }: Props) => {
  const { mutate: mutateDeletePost } = useMutationDeleteCompanyPost(params.id);
  const { mutate: createApplyComment, isPending: isCreatePending } =
    useMutationCreateCompanyComment(params.id);
  const { mutate: createCloseStatus } = useMutationCloseCompanyStatus(
    params.id,
  );

  const { data: comments } = useFetchComments(params.id);
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

  const confirmedApplies = comments?.filter(
    ({ isAccompanyConfirmedComment }) => isAccompanyConfirmedComment,
  );

  const isApplied = comments?.some(
    ({ memberProfile: { currentMember }, isAccompanyApplyComment }) =>
      currentMember && isAccompanyApplyComment,
  );

  const {
    status,
    createdAt,
    viewCount,
    memberProfile,
    images,
    concertName,
    title,
    region,
    totalPeople,
    startDate,
    endDate,
    concertPlace,
    startAge,
    endAge,
    gender,
    purposes,
    isWish,
    waitingCount,
  } = data;

  const isWriter = memberProfile.currentMember;

  const handleApply = () => {
    confirm('신청하시겠습니까? 신청 취소는 불가능합니다.') &&
      createApplyComment(undefined, {
        onSuccess: () => {
          toast.success('신청이 완료되었습니다.');
        },
        onError: () => {
          toast.error('신청에 실패했습니다.');
        },
      });
  };

  const handleClose = () => {
    confirm('모집을 마감하시겠습니까? 모집 마감 취소는 불가능합니다.') &&
      createCloseStatus(undefined, {
        onSuccess: () => {
          toast.success('모집이 마감되었습니다.');
        },
        onError: () => {
          toast.error('모집 마감에 실패했습니다.');
        },
      });
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="text-xl font-semibold">{title}</div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Profile
            id={memberProfile.id}
            name={memberProfile.nickname}
            image={memberProfile.profileImage}
          />
          <PostStatus
            status={status}
            createdAt={createdAt}
            waitingCount={waitingCount}
            viewCount={viewCount}
            isWish={isWish}
          />
        </div>
        {isWriter && (
          <div className="divide-x-2 self-end text-base font-medium text-gray-400">
            <Link className="px-1" href={`/recruitment/new?id=${params.id}`}>
              수정
            </Link>
            <Link className="px-1" href="/" onClick={() => mutateDeletePost()}>
              삭제
            </Link>
          </div>
        )}
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

      <Section className="flex items-center md:flex-nowrap">
        <h2 className="h-full w-1/2 text-nowrap text-xl font-semibold">
          신청자 목록 ({`${confirmedApplies.length}/${totalPeople}`}명)
        </h2>
        <ApplyForm
          isDisabled={
            isPending || isCreatePending || status === '모집 완료' || isApplied
          }
          className="flex sm:w-full"
          content={isWriter ? '모집 마감' : '신청하기'}
          handleMutate={isWriter ? handleClose : handleApply}
        />
      </Section>

      <Section>{data?.content}</Section>

      <CommentSection accompanyPostId={params.id} />

      <ApplyList
        isWriter={memberProfile.currentMember}
        accompanyPostId={params.id}
      />
    </div>
  );
};

export default Page;

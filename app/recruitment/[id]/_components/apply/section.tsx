'use client';

import { useEffect, useState } from 'react';

import { AccompanyPost } from '~/apis/scheme/accompanyDetail';
import ApplyForm from '~/app/recruitment/[id]/_components/apply/form';
import Section from '~/app/recruitment/[id]/_components/section';
import useMutationCreateCompanyComment from '~/hooks/mutations/useMutationCreateCompanyComment';
import useMutationDeleteComment from '~/hooks/mutations/useMutationDeleteComment';
import useFetchComments from '~/hooks/queries/useFetchComments';
import { cn } from '~/libs/utils';

interface Props extends React.HTMLProps<HTMLDivElement> {
  accompanyPostId: string;
  isWriter: boolean;
  status: AccompanyPost['status'];
}

const ApplySection = ({
  accompanyPostId,
  isWriter,
  status,
  className,
}: Props) => {
  const [content, setContent] = useState('');
  const { data: comments, isFetching } = useFetchComments(accompanyPostId);

  const applies = comments.filter(
    ({ isAccompanyApplyComment }) => isAccompanyApplyComment,
  );
  const isApply = applies.some(
    ({ memberProfile: { currentMember } }) => currentMember,
  );
  const applyCommentId = applies.find(
    ({ memberProfile: { currentMember } }) => currentMember,
  )?.id;

  const confirmedApplies = applies.filter(
    ({ isAccompanyConfirmedComment }) => isAccompanyConfirmedComment,
  );

  useEffect(() => {
    if (!isWriter && isApply) {
      setContent('동행 취소');
    } else if (!isWriter) {
      setContent('동행 신청');
    }
  }, [isApply, isWriter]);

  useEffect(() => {
    if (isWriter && status === '모집 완료') {
      setContent('마감 취소');
    } else if (isWriter) {
      setContent('마감');
    }
  }, [status, isWriter]);

  const { mutate: createApplyComment, isPending: isCreatePending } =
    useMutationCreateCompanyComment(accompanyPostId);
  const { mutate: deleteComment, isPending: isDeletePending } =
    useMutationDeleteComment();

  const isPending = isCreatePending || isDeletePending || isFetching;

  const handleApply = () => {
    if (isApply) {
      deleteComment(
        { commentId: String(applyCommentId) },
        {
          onSettled: () => setContent('동행 취소'),
        },
      );

      return;
    }
    createApplyComment(undefined, {
      onSettled: () => setContent('동행 신청'),
    });
  };

  // TODO: handleClose
  const handleClose = () => {
    if (status === '모집 완료' || content === '마감') {
      setContent('마감 취소');

      return;
    }
    setContent('마감');
  };

  const handleMutate = () => {
    if (isWriter) {
      return handleClose();
    }

    return handleApply();
  };

  return (
    <Section className={cn('flex items-center md:flex-nowrap', className)}>
      <h2 className="h-full w-1/2 text-xl font-semibold">
        신청자 목록 ({`${confirmedApplies.length}/${applies.length}`}명)
      </h2>
      <ApplyForm
        className="flex sm:w-full"
        handleMutate={handleMutate}
        isPending={isPending}
        content={content}
      />
    </Section>
  );
};

export default ApplySection;

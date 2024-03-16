import { useState } from 'react';

import Field from '~/app/recruitment/[id]/_components/field';
import { Button } from '~/components/button';
import useMutationCreateCompanyComment from '~/hooks/mutations/useMutationCreateCompanyComment';
import useMutationDeleteComment from '~/hooks/mutations/useMutationDeleteComment';
import useFetchComments from '~/hooks/queries/useFetchComments';

interface AccompanyApplyProps {
  count: number;
  accompanyPostId: string;
  currentMember: boolean;
}

const AccompanyApply = ({
  count,
  accompanyPostId,
  currentMember,
}: AccompanyApplyProps) => {
  const { mutate: createApplyComment, isPending: isCreatePending } =
    useMutationCreateCompanyComment(accompanyPostId);
  const { mutate: deleteComment, isPending: isDeletePending } =
    useMutationDeleteComment();
  const { data: comments, isPending: isFetchPending } =
    useFetchComments(accompanyPostId);

  const isPending = isCreatePending || isDeletePending || isFetchPending;

  const applyCommentId = comments.find(
    ({ isAccompanyApplyComment, memberProfile: { currentMember } }) =>
      isAccompanyApplyComment && currentMember,
  )?.id;

  const [toggle, setToggle] = useState(false);
  const handleApply = () => {
    if (toggle && applyCommentId) {
      deleteComment({ commentId: String(applyCommentId) });
      setToggle(false);

      return;
    }
    if (toggle) {
      return;
    }
    createApplyComment();
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex w-full">
      <div className="flex w-1/2 gap-8">
        <Field label="신청 대기자" value={count} />
      </div>
      <div className="w-1/2">
        {!currentMember && (
          <Button className="px-8" onClick={handleApply} disabled={isPending}>
            {toggle ? '신청 취소' : '동행 신청'}
          </Button>
        )}
        {currentMember && (
          <Button className="px-8" onClick={handleClose} disabled={isPending}>
            {toggle ? '동행 마감' : '마감 해제'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccompanyApply;

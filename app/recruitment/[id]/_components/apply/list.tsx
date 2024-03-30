'use client';

import { toast } from 'sonner';

import CommentContent from '~/app/recruitment/[id]/_components/comment/list/content';
import { Button } from '~/components/button';
import useMutationConfirmCompanion from '~/hooks/mutations/useMutationConfirmCompanion';
import useFetchComments from '~/hooks/queries/useFetchComments';

interface ApplyListProps {
  isWriter: boolean;
  accompanyPostId: string;
}

const ApplyList = ({ isWriter, accompanyPostId }: ApplyListProps) => {
  const { mutate: confirmApply } = useMutationConfirmCompanion();

  const { data: comments } = useFetchComments(accompanyPostId);
  const applies = comments.filter(
    ({ isAccompanyApplyComment }) => isAccompanyApplyComment,
  );

  const handleConfirmApply = (id: string) => () => {
    confirm('동행 신청을 수락하시겠습니까? 수락 취소는 불가능합니다.') &&
      confirmApply(id, {
        onSuccess: () => {
          toast.success('동행 신청을 수락했습니다.');
        },
        onError: () => {
          toast.error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        },
      });
  };

  return (
    <ul className="divide-y-2">
      <h2 className="mb-4 text-xl font-semibold">신청자 목록</h2>
      {applies?.map(
        ({
          id,
          updatedAt,
          memberProfile: { profileImage, nickname, currentMember },
          isAccompanyConfirmedComment,
        }) => (
          <li className="flex flex-col gap-3 py-2" key={id}>
            <CommentContent
              profileImage={profileImage}
              nickName={`${nickname} ${currentMember ? '(나)' : ''}`}
              updatedAt={updatedAt}
            >
              {!isAccompanyConfirmedComment && isWriter && (
                <Button
                  onClick={handleConfirmApply(String(id))}
                  variant="link"
                  className=" self-end text-gray-700"
                >
                  수락
                </Button>
              )}
              {isAccompanyConfirmedComment && (
                <Button
                  variant="link"
                  className="self-end text-gray-700"
                  disabled
                >
                  수락됨
                </Button>
              )}
            </CommentContent>
          </li>
        ),
      )}
    </ul>
  );
};

export default ApplyList;

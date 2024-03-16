'use client';

import CommentContent from '~/app/recruitment/[id]/_components/comment/list/content';
import useFetchComments from '~/hooks/queries/useFetchComments';

interface ApplyListProps {
  isWriter: boolean;
  accompanyPostId: string;
}

const ApplyList = ({ isWriter, accompanyPostId }: ApplyListProps) => {
  const { data: comments } = useFetchComments(accompanyPostId);
  const applies = comments.filter(
    ({ isAccompanyApplyComment }) => isAccompanyApplyComment,
  );

  if (
    !isWriter &&
    !applies.find(({ memberProfile: { currentMember } }) => currentMember)
  ) {
    return null;
  }

  return (
    <ul className="divide-y-2">
      <h2 className="mb-4 text-xl font-semibold">동행 {applies.length}명</h2>
      {applies?.map(
        ({
          id,
          updatedAt,
          memberProfile: { profileImage, nickname, currentMember },
        }) => (
          <li className="flex flex-col gap-3 py-2" key={id}>
            <CommentContent
              profileImage={profileImage}
              nickName={`${nickname} ${currentMember ? '(나)' : ''}`}
              updatedAt={updatedAt}
            />
          </li>
        ),
      )}
    </ul>
  );
};

export default ApplyList;

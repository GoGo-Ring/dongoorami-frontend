'use client';

import {
  CommentForm,
  CommentList,
} from '~/app/recruitment/[id]/_components/comment';
import useQueryComment from '~/hooks/queries/useQueryComment';

interface Props {
  accompanyPostId: string;
}

const CommentSection = ({ accompanyPostId }: Props) => {
  const { data: comments } = useQueryComment(accompanyPostId);

  const commentsLength = comments?.length;

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold">댓글 {commentsLength}개</h2>
      <CommentForm accompanyPostId={accompanyPostId} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;

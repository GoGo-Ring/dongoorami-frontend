'use client';

import {
  CommentForm,
  CommentList,
} from '~/app/recruitment/[id]/_components/comment';
import useFetchComments from '~/hooks/queries/useFetchComments';

interface Props {
  accompanyPostId: string;
}

const CommentSection = ({ accompanyPostId }: Props) => {
  const { data: comments } = useFetchComments(accompanyPostId);

  const { length } = comments;

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold">댓글 {length}개</h2>
      <CommentForm accompanyPostId={accompanyPostId} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;

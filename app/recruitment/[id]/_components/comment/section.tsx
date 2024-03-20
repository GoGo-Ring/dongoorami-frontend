'use client';

import {
  CommentForm,
  CommentList,
} from '~/app/recruitment/[id]/_components/comment';
import useMutationComment from '~/hooks/mutations/useMutationComment';
import useFetchComments from '~/hooks/queries/useFetchComments';

interface Props {
  accompanyPostId: string;
}

const CommentSection = ({ accompanyPostId }: Props) => {
  const { data: comments } = useFetchComments(accompanyPostId);
  const { length } = comments;

  const { mutate: createComment, isPending } =
    useMutationComment(accompanyPostId); // TODO: userId

  const handleCreateComment = (content: string) => {
    createComment({ content });
  };

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold">댓글 {length}개</h2>
      <CommentForm
        accompanyPostId={accompanyPostId}
        commentId="base"
        handleMutateComment={handleCreateComment}
        isPending={isPending}
      />
      <CommentList comments={comments} accompanyPostId={accompanyPostId} />
    </div>
  );
};

export default CommentSection;

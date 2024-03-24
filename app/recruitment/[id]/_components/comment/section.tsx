'use client';

import {
  CommentForm,
  CommentList,
} from '~/app/recruitment/[id]/_components/comment';
import useMutationComment from '~/hooks/mutations/useMutationComment';
import useFetchComments from '~/hooks/queries/useFetchComments';
import { cn } from '~/libs/utils';

interface Props extends React.HTMLProps<HTMLDivElement> {
  accompanyPostId: string;
}

const CommentSection = ({ accompanyPostId, className }: Props) => {
  const { data: comments } = useFetchComments(accompanyPostId);
  const notAppliedComments = comments?.filter(
    ({ isAccompanyApplyComment }) => !isAccompanyApplyComment,
  );

  const { mutate: createComment, isPending } =
    useMutationComment(accompanyPostId);

  const handleCreateComment = (content: string) => createComment({ content });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <h2 className="mb-4 text-xl font-semibold">
        댓글 {notAppliedComments.length}개
      </h2>
      <CommentForm
        accompanyPostId={accompanyPostId}
        commentId="base"
        handleMutateComment={handleCreateComment}
        isPending={isPending}
        initialComment=""
      />
      <CommentList comments={comments} accompanyPostId={accompanyPostId} />
    </div>
  );
};

export default CommentSection;

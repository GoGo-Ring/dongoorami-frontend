'use client';

import { useRef } from 'react';

import { Button } from '~/components/button';
import CountErrorText from '~/components/count-error-text';
import { Label } from '~/components/label';
import { Textarea } from '~/components/textarea';
import useMutationComment from '~/hooks/mutations/useMutationComment';
import useMutationUpdateComment from '~/hooks/mutations/useMutationUpdateComment';
import useForm from '~/hooks/useForm';

interface CommentFormProps {
  accompanyPostId: string;
  initialComment?: string;
  commentId: string | number;
  handleCancel?: () => void;
  editMode?: boolean;
}

const CommentForm = ({
  accompanyPostId,
  initialComment,
  commentId,
  handleCancel,
  editMode = false,
}: CommentFormProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { mutate: createComment, isPending: isCreatePending } =
    useMutationComment(accompanyPostId, '1'); // TODO: userId
  const { mutate: updateComment, isPending: isUpdatePending } =
    useMutationUpdateComment(accompanyPostId, String(commentId));

  const isAnyPending = isCreatePending || isUpdatePending;
  const id = `comment-${commentId}`;

  const { handleUnControlledSubmit, handleChange, values } = useForm({
    initialValues: { [id]: initialComment || '' },
    onSubmit: values => {
      if (editMode) {
        updateComment({ content: values[id] });
      } else {
        createComment({ content: values[id] });
      }
      handleCancel?.();
    },
  });

  const limit = 200;
  const limitError = values[id].length > limit || values[id].length === 0;

  return (
    <form onSubmit={handleUnControlledSubmit} className="flex flex-col">
      <Label htmlFor="comment" />
      <Textarea
        className="h-20 resize-none"
        ref={ref}
        defaultValue={initialComment}
        id={id}
        name="comment"
        placeholder="댓글을 입력하세요"
        onChange={handleChange}
        value={values[id]}
      />
      <CountErrorText limit={limit} count={values[id].length} />
      <div className="flex gap-2 self-end pb-2">
        <Button
          variant={editMode ? 'link' : 'default'}
          className="w-14 self-end"
          type="submit"
          disabled={isAnyPending || limitError}
        >
          등록
        </Button>
        {editMode && (
          <Button
            variant="link"
            className="w-14 self-end text-destructive"
            type="button"
            disabled={isAnyPending}
            onClick={handleCancel}
          >
            취소
          </Button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;

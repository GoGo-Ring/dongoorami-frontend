'use client';

import { useRef } from 'react';

import { Button } from '~/components/button';
import CountErrorText from '~/components/count-error-text';
import { Label } from '~/components/label';
import { Textarea } from '~/components/textarea';
import useForm from '~/hooks/useForm';

interface CommentFormProps {
  accompanyPostId: string;
  initialComment?: string;
  commentId: string | number;
  handleCancel?: () => void;
  editMode?: boolean;
  handleMutateComment?: (content: string) => void;
  isPending?: boolean;
}

const CommentForm = ({
  initialComment,
  commentId,
  handleCancel,
  handleMutateComment,
  editMode = false,
  isPending,
}: CommentFormProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const id = `comment-${commentId}`;

  const { handleSubmit, handleChange, values } = useForm({
    initialValues: { [id]: initialComment || '' },
    onSubmit: values => {
      handleMutateComment?.(values[id]);
      handleCancel?.();
    },
  });

  const limit = 200;
  const { length } = values[id];
  const limitError = length > limit || length === 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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
          disabled={isPending || limitError}
        >
          등록
        </Button>
        {editMode && (
          <Button
            variant="link"
            className="w-14 self-end text-destructive"
            type="button"
            disabled={isPending}
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

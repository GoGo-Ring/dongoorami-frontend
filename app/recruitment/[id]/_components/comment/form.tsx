'use client';

import { useRef } from 'react';

import { Button } from '~/components/button';
import { Label } from '~/components/label';
import { Textarea } from '~/components/textarea';
import useMutationComment from '~/hooks/mutations/useMutationComment';
import useForm from '~/hooks/useForm';

interface CommentFormProps {
  accompanyPostId: string;
}

const CommentForm = ({ accompanyPostId }: CommentFormProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { mutate, isPending } = useMutationComment(accompanyPostId);

  const { handleUnContolledSubmit } = useForm({
    initialValues: { comment: '' },
    onSubmit: values => {
      mutate({ userId: '1', content: values.comment });
    },
    validationRulesList: [
      {
        id: 'comment',
        validate: value => value.trim().length > 0,
        message: '댓글을 입력하세요',
      },
    ],
  });

  return (
    <form onSubmit={handleUnContolledSubmit} className="flex flex-col gap-7">
      <Label htmlFor="comment" />
      <Textarea
        className="h-20 resize-none"
        ref={ref}
        id="comment"
        name="comment"
        placeholder="댓글을 입력하세요"
      />
      <Button className="w-14 self-end" type="submit" disabled={isPending}>
        등록
      </Button>
    </form>
  );
};

export default CommentForm;

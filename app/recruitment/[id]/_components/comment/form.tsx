'use client';

import { useRef } from 'react';

import { Button } from '~/components/button';
import { Label } from '~/components/label';
import { Textarea } from '~/components/textarea';
import useMutationComment from '~/hooks/mutations/useMutationComment';

interface CommentFormProps {
  accompanyPostId: string;
}

const CommentForm = ({ accompanyPostId }: CommentFormProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { mutate, isPending } = useMutationComment(accompanyPostId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current || !ref.current.value) {
      return;
    }

    mutate({ userId: '1', content: ref.current.value });
    ref.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
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

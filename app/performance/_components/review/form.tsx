'use client';

import { useState } from 'react';

import StarRating from '~/app/review/_components/star-rating';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Textarea } from '~/components/textarea';
import useMutationPerformanceReviewComment from '~/hooks/mutations/useMutationPerformanceReviewComment';
import useMutationUpdatePerformanceReview from '~/hooks/mutations/useMutationUpdatePerformanceReview';
import useForm from '~/hooks/useForm';

interface ReviewFormProps {
  initialTitle: string;
  intialContent?: string;
  id: number;
  isModify?: boolean;
  handleToggle?: () => void;
  concertId: number;
}

const ReviewForm = ({
  id,
  initialTitle,
  intialContent,
  isModify = false,
  handleToggle,
  concertId,
}: ReviewFormProps) => {
  const { mutate } = useMutationPerformanceReviewComment();
  const { mutate: update } = useMutationUpdatePerformanceReview({
    callback: handleToggle,
  });
  const [rate, setRate] = useState(0);

  const { handleUnControlledSubmit } = useForm({
    initialValues: {
      star: '0',
      title: initialTitle,
      content: intialContent || '',
    },
    onSubmit: values => {
      const { star, content, title } = values;

      if (isModify) {
        update({
          title,
          content,
          rating: parseInt(star),
          concertReviewId: id,
        });
      } else {
        mutate({ rating: parseInt(star), concertId, content, title });
      }

      return values;
    },
  });

  return (
    <form onSubmit={handleUnControlledSubmit} className="flex flex-col gap-4">
      <StarRating rate={rate} setRate={setRate} id="star" />
      <Input
        className="w-1/2 sm:w-full"
        placeholder={initialTitle}
        defaultValue={initialTitle}
        id="title"
      />
      <Textarea
        name="content"
        id="content"
        className="resize-none"
        placeholder="리뷰를 입력해주세요."
        defaultValue={intialContent}
      />
      {isModify ? (
        <div className="flex justify-end gap-3">
          <Button
            variant={'link'}
            className="h-fit p-0 text-gray-300"
            onClick={handleToggle}
          >
            취소
          </Button>
          <Button
            variant={'link'}
            className="h-fit p-0 text-gray-300"
            type="submit"
          >
            등록
          </Button>
        </div>
      ) : (
        <Button type="submit" className="self-end" disabled={false}>
          입력
        </Button>
      )}
    </form>
  );
};

export default ReviewForm;

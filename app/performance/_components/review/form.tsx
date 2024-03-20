'use client';

import { useState } from 'react';

import StarRating from '~/app/review/_components/star-rating';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Textarea } from '~/components/textarea';
import useMutationPerformanceReviewComment from '~/hooks/mutations/useMutationPerformanceReviewComment';
import useForm from '~/hooks/useForm';

interface ReviewFormProps {
  initialTitle: string;
  intialContent?: string;
  id: number;
  refetch: () => void;
}

const ReviewForm = ({
  id,
  initialTitle,
  intialContent,
  refetch,
}: ReviewFormProps) => {
  const { mutate } = useMutationPerformanceReviewComment();
  const [rate, setRate] = useState(0);
  const { handleUnControlledSubmit } = useForm({
    initialValues: {
      star: '0',
      title: initialTitle,
      content: intialContent || '',
    },
    onSubmit: values => {
      const { star, content, title } = values;

      mutate(
        { rating: parseInt(star), concertId: id, content, title },
        {
          onSuccess: () => {
            refetch();
          },
        },
      );
      setRate(0);

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
      <Button type="submit" className="self-end" disabled={false}>
        입력
      </Button>
    </form>
  );
};

export default ReviewForm;

'use client';

import { useState } from 'react';

import StarRating from '~/app/review/_components/star-rating';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Textarea } from '~/components/textarea';
import useForm from '~/hooks/useForm';

interface ReviewFormProps {
  initialTitle: string;
  intialContent?: string;
}

const ReviewForm = ({ initialTitle, intialContent }: ReviewFormProps) => {
  const [rate, setRate] = useState(0);
  const { handleUnContolledSubmit } = useForm({
    initialValues: {
      star: '0',
      title: initialTitle,
      content: intialContent || '',
    },
    onSubmit: values => {
      // TODO: submit review
      setRate(0);

      return values;
    },
  });

  return (
    <form onSubmit={handleUnContolledSubmit} className="flex flex-col gap-4">
      <StarRating rate={rate} setRate={setRate} id="star" />
      <Input
        className="w-1/2"
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

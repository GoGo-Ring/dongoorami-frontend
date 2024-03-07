'use client';

import { useState } from 'react';

import ErrorText from '~/app/performance/_components/review/error-text';
import StarRating from '~/app/review/_components/star-rating';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Textarea } from '~/components/textarea';
import useForm from '~/hooks/useForm';

const ReviewForm = () => {
  const [rate, setRate] = useState(0);
  const { handleUnContolledSubmit, errors } = useForm({
    initialValues: {
      star: '0',
      title: '',
      content: '',
    },
    onSubmit: values => {
      // TODO: submit review
      setRate(0);

      return values;
    },
    validationRulesList: [
      {
        id: 'star',
        validate: value => Number(value) > 0,
        message: '별점을 선택해주세요.',
      },
      {
        id: 'title',
        validate: value => value.length <= 30 && value.length >= 1,
        message: '리뷰 제목은 1자 이상 30자 이하로 입력해주세요.',
      },
      {
        id: 'content',
        validate: value => value.length <= 100 && value.length >= 1,
        message: '리뷰는 1자 이상 100자 이하로 입력해주세요.',
      },
    ],
  });

  return (
    <form onSubmit={handleUnContolledSubmit} className="flex flex-col">
      <StarRating rate={rate} setRate={setRate} id="star" />
      <ErrorText message={errors.star} />
      <Input
        className="w-1/2"
        placeholder="리뷰 제목을 입력해주세요."
        id="title"
      />
      <ErrorText message={errors.title} />
      <Textarea
        name="content"
        id="content"
        className="resize-none"
        placeholder="리뷰를 입력해주세요."
      />
      <ErrorText message={errors.content} />
      <Button type="submit" className="self-end" disabled={false}>
        입력
      </Button>
    </form>
  );
};

export default ReviewForm;

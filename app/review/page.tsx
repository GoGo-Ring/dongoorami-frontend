'use client';

import { MouseEvent, useCallback, useState } from 'react';

import { Button } from '~/components/button';

import { RATING_ITEMS } from './_components/constants';
import ReviewForm, { RatingItem, ReviewType } from './_components/review-form';

const Page = () => {
  const users = [
    {
      userId: '1',
      userName: '사용자1',
    },
    {
      userId: '2',
      userName: '사용자2',
    },
  ];

  const [, setReviews] = useState<ReviewType[]>(
    users.map(({ userId }) => ({
      userId: userId,
      starRating: 0,
      text: '',
      isChecked: RATING_ITEMS.reduce((acc, cur) => {
        return { ...acc, [cur]: false };
      }, {} as RatingItem),
    })),
  );

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onUpdate = useCallback(
    ({ userId, text, starRating, isChecked }: ReviewType) => {
      setReviews(reviews =>
        reviews.map(review =>
          userId === review.userId
            ? { userId, text, starRating, isChecked }
            : review,
        ),
      );
    },
    [],
  );

  return (
    <form className="m-auto flex w-fit flex-col justify-center gap-3">
      {users?.map(({ userName, userId }) => (
        <ReviewForm
          key={userId}
          username={userName}
          userId={userId}
          onUpdate={onUpdate}
        />
      ))}

      <Button onClick={handleSubmit} type="submit">
        제출 완료!
      </Button>
    </form>
  );
};

export default Page;

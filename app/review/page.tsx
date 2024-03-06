'use client';

import { MouseEvent, useCallback, useState } from 'react';

import { Button } from '~/components/button';

import ReviewForm, { ReviewType } from './_components/review-form';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviews, setReviews] = useState<ReviewType[]>(
    users.map(({ userId }) => ({
      userId: userId,
      starRating: 0,
      text: '',
    })),
  );

  const handler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onUpdate = useCallback(({ userId, text, starRating }: ReviewType) => {
    setReviews(reviews =>
      reviews.map(review =>
        userId === review.userId ? { userId, text, starRating } : review,
      ),
    );
  }, []);

  return (
    <form className="flex w-fit flex-col justify-center gap-3">
      {users?.map(({ userName, userId }) => (
        <ReviewForm
          key={userId}
          username={userName}
          userId={userId}
          onUpdate={onUpdate}
        />
      ))}

      <Button onClick={handler} type="submit">
        제출 완료!
      </Button>
    </form>
  );
};

export default Page;

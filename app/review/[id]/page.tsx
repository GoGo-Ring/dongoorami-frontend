'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ReviewTarget } from '~/apis/scheme/accompanyReview';
import { Button } from '~/components/button';
import useMutationUpdateAccompanyReviews from '~/hooks/mutations/useMutationCreateAccompanyReviews';
import useFetchAccompanyReviews from '~/hooks/queries/useFetchAccompanyReviewees';

import { RATING_ITEMS } from '../_components/constants';
import ReviewForm, { RatingItem, ReviewType } from '../_components/review-form';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

interface PageUsers {
  userId: number;
  text: string;
  starRating: number;
  isChecked: RatingItem;
}

const Page = ({ params }: Props) => {
  const router = useRouter();
  const paramsId = parseInt(params.id);

  const { data: targetUsers } =
    useFetchAccompanyReviews<ReviewTarget>(paramsId);
  const { mutate, isPending, isSuccess } = useMutationUpdateAccompanyReviews();

  const [reviews, setReviews] = useState<PageUsers[]>();

  useEffect(() => {
    if (!targetUsers) {
      return;
    }
    const initialTarget = targetUsers.map(({ id }) => ({
      userId: id,
      starRating: 0,
      text: '',
      isChecked: RATING_ITEMS.reduce((acc, cur) => {
        return { ...acc, [cur]: false };
      }, {} as RatingItem),
    }));

    setReviews([...initialTarget]);
  }, [targetUsers]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!reviews) {
      return;
    }
    const data = reviews.map(({ userId, text, starRating, isChecked }) => {
      const checked = Object.keys(isChecked).filter(key => isChecked[key]);

      return {
        memberId: userId,
        content: text,
        rating: starRating,
        ratingItemTypes: checked,
      };
    });

    mutate(
      { data, id: paramsId },
      {
        onSuccess: () => {
          toast.success('리뷰 제출이 완료되었습니다.');
          router.replace('/');
        },
      },
    );
  };

  const onUpdate = useCallback(
    ({ userId, text, starRating, isChecked }: ReviewType) => {
      setReviews(reviews =>
        reviews
          ? reviews?.map(review =>
              userId === review.userId
                ? {
                    userId,
                    text,
                    starRating,
                    isChecked,
                  }
                : review,
            )
          : [],
      );
    },
    [],
  );

  return (
    <form className="m-auto flex w-[350px] flex-col justify-center gap-3">
      {targetUsers?.map(({ nickname, id }, index) => (
        <ReviewForm
          key={`${id}_${index}`}
          username={nickname}
          userId={id}
          onUpdate={onUpdate}
        />
      ))}

      <Button
        onClick={handleSubmit}
        type="submit"
        disabled={isPending || isSuccess}
      >
        제출 완료!
      </Button>
    </form>
  );
};

export default Page;

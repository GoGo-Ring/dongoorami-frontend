'use client';

import { ConcertReview } from '~/apis/scheme/performance';
import StarRating from '~/app/review/_components/star-rating';

export const PerformanceReview = ({
  nickname,
  title,
  content,
  rating,
  updatedAt,
}: ConcertReview) => {
  return (
    <div className="relative flex w-full flex-col gap-1 rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between">
        <StarRating rate={rating} />
        <div className="flex gap-3 text-gray-300 md:divide-x lg:divide-x">
          <span>{nickname}</span>
          <span className="pl-3 sm:absolute sm:bottom-4 sm:right-4">
            {updatedAt}
          </span>
        </div>
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p>{content}</p>
      <span className="md:hidden lg:hidden">&nbsp;</span>
    </div>
  );
};

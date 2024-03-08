'use client';

import StarRating from '~/app/review/_components/star-rating';

import { PerformanceRecruitmentProps } from './performance-recruitment';

interface PerformanceReviewProps extends PerformanceRecruitmentProps {
  starRating: number;
}
export const PerformanceReview = ({
  userId,
  date,
  title,
  content,
  starRating,
}: PerformanceReviewProps) => {
  return (
    <div className="relative flex flex-col gap-1 sm:w-[250px] md:w-[630px] lg:w-[840px]">
      <div className="flex justify-between">
        <StarRating rate={starRating} />
        <div className="flex gap-3 divide-x text-gray-300 sm:absolute sm:bottom-0 sm:right-0">
          <span>{userId}</span>
          <span className="pl-3 sm:hidden">{date}</span>
        </div>
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p>{content}</p>
      <span className="md:hidden lg:hidden">&nbsp;</span>
    </div>
  );
};

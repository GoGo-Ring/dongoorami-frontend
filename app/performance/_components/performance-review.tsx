'use client';

import { useState } from 'react';

import { ConcertReview } from '~/apis/scheme/performance';
import StarRating from '~/app/review/_components/star-rating';
import { Button } from '~/components/button';
import useMutationDeletePerformanceReview from '~/hooks/mutations/useMutationDeletePerformanceReview';

import ReviewForm from './review/form';

export const PerformanceReview = ({
  id,
  nickname,
  title,
  content,
  rating,
  updatedAt,
  isWriter,
  concertId,
}: ConcertReview) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: del } = useMutationDeletePerformanceReview({
    callback: () => setIsOpen(false),
  });

  const handleDeleteClick = () => {
    del({ concertReviewId: id });
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex w-full flex-col gap-1 rounded-lg border border-gray-200 p-4">
      {isOpen ? (
        <ReviewForm
          isModify={isOpen}
          id={id}
          initialTitle={title}
          intialContent={content}
          handleToggle={handleToggle}
          concertId={concertId}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <StarRating rate={rating} />
            <div className="flex gap-3 text-gray-300 md:divide-x lg:divide-x">
              <span>{nickname}</span>
              <div className="flex pl-3 sm:absolute sm:bottom-4 sm:right-4">
                {updatedAt}
              </div>
            </div>
          </div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p>{content}</p>
        </>
      )}
      {isWriter ? (
        !isOpen && (
          <div className="flex gap-3">
            <Button
              variant={'link'}
              className="h-fit p-0 text-gray-300"
              onClick={handleToggle}
            >
              수정
            </Button>
            <Button
              variant={'link'}
              className="h-fit p-0 text-gray-300"
              onClick={handleDeleteClick}
            >
              삭제
            </Button>
          </div>
        )
      ) : (
        <span className="md:hidden lg:hidden">&nbsp;</span>
      )}
    </div>
  );
};

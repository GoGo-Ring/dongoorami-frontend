import { useMutation } from '@tanstack/react-query';

import { deletePerformanceReview } from '~/apis/performance';
import { ConcertReviewId } from '~/apis/scheme/performance';

const useMutationDeletePerformanceReview = () => {
  return useMutation({
    mutationFn: ({ concertReviewId }: ConcertReviewId) =>
      deletePerformanceReview(concertReviewId),
  });
};

export default useMutationDeletePerformanceReview;

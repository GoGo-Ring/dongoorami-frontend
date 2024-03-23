import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePerformanceReview } from '~/apis/performance';
import { ConcertReviewId } from '~/apis/scheme/performance';

const useMutationDeletePerformanceReview = ({
  callback,
}: {
  callback: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ concertReviewId }: ConcertReviewId) =>
      deletePerformanceReview(concertReviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concertReviews'] });
      callback();
    },
  });
};

export default useMutationDeletePerformanceReview;

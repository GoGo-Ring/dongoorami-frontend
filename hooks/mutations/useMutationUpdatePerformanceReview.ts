import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePerformanceReview } from '~/apis/performance';
import { PerformanceReviewUpdate } from '~/apis/scheme/performance';

const useMutationUpdatePerformanceReview = ({
  callback,
}: {
  callback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PerformanceReviewUpdate) =>
      updatePerformanceReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concertReviews'] });
      if (callback) {
        callback();
      }
    },
  });
};

export default useMutationUpdatePerformanceReview;

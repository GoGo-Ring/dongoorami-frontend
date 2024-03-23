import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPerformanceReview } from '~/apis/performance';
import { PerformanceReviewPost } from '~/apis/scheme/performance';

const useMutationPerformanceReviewComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PerformanceReviewPost) => createPerformanceReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concertReviews'] });
    },
  });
};

export default useMutationPerformanceReviewComment;

import { useMutation } from '@tanstack/react-query';

import { createPerformanceReview } from '~/apis/performance';
import { PerformanceReviewPost } from '~/apis/scheme/performance';

const useMutationPerformanceReviewComment = () => {
  return useMutation({
    mutationFn: (data: PerformanceReviewPost) => createPerformanceReview(data),
  });
};

export default useMutationPerformanceReviewComment;

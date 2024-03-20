import { useMutation } from '@tanstack/react-query';

import { updatePerformanceReview } from '~/apis/performance';
import { PerformanceReviewUpdate } from '~/apis/scheme/performance';

const useMutationUpdatePerformanceReview = () => {
  return useMutation({
    mutationFn: (data: PerformanceReviewUpdate) =>
      updatePerformanceReview(data),
  });
};

export default useMutationUpdatePerformanceReview;

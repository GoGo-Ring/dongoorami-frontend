import { useQuery } from '@tanstack/react-query';

import { getSentReviews } from '~/apis/review';

const useFetchSentReview = (userId?: number) => {
  const query = useQuery({
    queryKey: ['sentReview', userId],
    queryFn: () => getSentReviews(),
  });

  return query;
};

export default useFetchSentReview;

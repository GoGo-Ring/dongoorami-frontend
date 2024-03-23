import { useQuery } from '@tanstack/react-query';

import { getAccompanyReviews } from '~/apis/review';

const useFetchAccompanyReviews = <T>(id: number) => {
  return useQuery({
    queryKey: ['accompanyReviewees', id],
    queryFn: () => getAccompanyReviews<T>(id),
  });
};

export default useFetchAccompanyReviews;

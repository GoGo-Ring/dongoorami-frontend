import { useQuery } from '@tanstack/react-query';

import { getConcertReviews } from '~/apis/performance';

const useFetchConcertReviews = (concertId: string) => {
  return useQuery({
    queryKey: ['concertReviews', concertId],
    queryFn: () => getConcertReviews(concertId),
  });
};

export default useFetchConcertReviews;

import { useQuery } from '@tanstack/react-query';

import { getAccompanyList } from '~/apis/companion';
import {
  AccompaniesPostsConcerts,
  AccompanyPostConcertResponses,
} from '~/apis/scheme/performance';

const useFetchAccompanyCommentList = ({
  concertId,
  size = 10,
}: AccompaniesPostsConcerts) => {
  return useQuery({
    queryKey: ['accompaniesPostsConcerts', concertId],
    queryFn: () =>
      getAccompanyList<AccompanyPostConcertResponses>({ concertId, size }),
  });
};

export default useFetchAccompanyCommentList;

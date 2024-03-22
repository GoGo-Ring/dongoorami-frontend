import { useQuery } from '@tanstack/react-query';

import { getAccompanyList } from '~/apis/companion';
import { PerformanceRecruitment } from '~/apis/scheme/accompany';

const useFetchAccompanyCommentList = (concertId: string) => {
  return useQuery({
    queryKey: ['accompanyCommentList', concertId],
    queryFn: () => getAccompanyList<PerformanceRecruitment[]>(concertId),
  });
};

export default useFetchAccompanyCommentList;

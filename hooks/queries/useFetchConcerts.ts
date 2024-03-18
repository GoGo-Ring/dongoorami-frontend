import { useQuery } from '@tanstack/react-query';

import { getContertDetail } from '~/apis/performance';

export const useFetchConcerts = (id: string) => {
  return useQuery({
    queryKey: ['concert', id],
    queryFn: () => getContertDetail(id),
  });
};

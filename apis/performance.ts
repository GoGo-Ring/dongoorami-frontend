import { PerformanceList } from './scheme/performance';

import api from '.';

export const getPerformances = async () => {
  const { data } = await api.get<PerformanceList>({
    url: '/search/concerts',
  });

  return data;
};

export const getPerformancesList = async (
  params: string,
  pageParam: number,
) => {
  const { data } = await api.get<PerformanceList>({
    url: `/search/concerts?${params}$_size=${pageParam}`,
  });

  return data;
};

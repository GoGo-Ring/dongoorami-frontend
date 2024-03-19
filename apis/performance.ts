import { PerformanceList } from './scheme/performance';

import api from '.';

export const getPerformances = async () => {
  const { data } = await api.get<PerformanceList>({
    url: '/search/concerts',
  });

  return data;
};

export const getPerformancesList = async (
  searchParams: string,
  size: number,
  lastId: number,
) => {
  const cursorId = lastId ? `&cursorId=${lastId}` : '';

  const { data } = await api.get<PerformanceList>({
    url: `/concerts?${searchParams}`,
    params: {
      size,
      cursorId,
    },
  });

  return data;
};

import { PerformanceInfoCard } from './scheme/performance';

import api from '.';

const getPerformances = async (): Promise<PerformanceInfoCard[]> => {
  const { data } = await api.get<PerformanceInfoCard[]>({
    url: '/search/concerts',
  });

  return data;
};

export const getContertDetail = async (id: string): Promise<ConcertDetail> => {
  const { data } = await api.get<ConcertDetail>({
    url: `/concerts/${id}`,
  });

  return data;
};

export default getPerformances;

import { PerformanceList } from './scheme/performance';

import api from '.';

const getPerformances = async (params: string, pageParam: number) => {
  const { data } = await api.get<PerformanceList>({
    url: `/search/concerts?${params}$_size=${pageParam}`,
  });

  return data;
};

export default getPerformances;

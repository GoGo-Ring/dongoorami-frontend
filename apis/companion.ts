import { AccompanyPostInfoList } from './scheme/accompany';

import api from '.';

export const getCompanions = async () => {
  const { data } = await api.get<AccompanyPostInfoList>({
    url: '/accompanies/posts',
  });

  return data;
};

export const getCompanionsList = async (params: string, pageParam: number) => {
  const { data } = await api.get<AccompanyPostInfoList>({
    url: `/accompanies/posts?${params}$_size=${pageParam}`,
  });

  return data;
};

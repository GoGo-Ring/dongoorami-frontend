import { AccompanyPostInfoList } from './scheme/accompany';

import api from '.';

export const getCompanions = async () => {
  const { data } = await api.get<AccompanyPostInfoList>({
    url: '/accompanies/posts',
  });

  return data;
};

export const getCompanionsList = async (
  params: string,
  pageParam: number,
  lastId: number,
) => {
  const cursorId = lastId ? `&cursorId=${lastId}` : '';

  const { data } = await api.get<AccompanyPostInfoList>({
    url: `/accompanies/posts?${params}&size=${pageParam}${cursorId}`,
  });

  return data;
};

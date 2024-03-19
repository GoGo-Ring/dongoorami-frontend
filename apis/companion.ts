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
  size: number,
  lastId: number,
) => {
  const cursorId = lastId ? lastId : '';

  const { data } = await api.get<AccompanyPostInfoList>({
    url: `/accompanies/posts?${params}`,
    params: { size, cursorId },
  });

  return data;
};

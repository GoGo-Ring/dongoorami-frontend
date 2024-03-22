import { AccompanyPostInfoList } from './scheme/accompany';

import api from '.';

export const getCompanions = async () => {
  const { data } = await api.get<AccompanyPostInfoList>({
    url: '/accompanies/posts',
  });

  return data;
};

export const getCompanionsList = async (
  searchParams: string,
  size: number,
  lastId: number,
) => {
  const cursorId = lastId ? lastId : '';

  const { data } = await api.get<AccompanyPostInfoList>({
    url: `/accompanies/posts?${searchParams}`,
    params: { size, cursorId },
  });

  return data;
};

export const getAccompanyList = async <T>(id: string) => {
  const { data } = await api.get<T>({
    url: `/concerts/accompany/${id}`,
  });

  return data;
};

import {
  ConcertDetail,
  ConcertReviewList,
  PerformanceList,
} from './scheme/performance';

import api from '.';

export const getPerformances = async () => {
  const { data } = await api.get<PerformanceList>({
    url: '/search/concerts',
  });

  return data;
};

export const getContertDetail = async (id: string) => {
  const { data } = await api.get<ConcertDetail>({
    url: `/concerts/${id}`,
  });

  return data;
};

export const getConcertReviews = async (id: string) => {
  const { data } = await api.get<ConcertReviewList>({
    url: `/concerts/reviews/${id}`,
  });

  return data;
};

export const getPerformancesList = async (
  searchParams: string,
  size: number,
  lastId: number,
) => {
  const cursorId = lastId ? lastId : '';

  const { data } = await api.get<PerformanceList>({
    url: `/concerts?${searchParams}`,
    params: {
      size,
      cursorId,
    },
  });

  return data;
};

export const getCarouselPerformances = async () => {
  const { data } = await api.get<PerformanceList>({
    url: '/concerts',
    params: {
      size: 6,
    },
  });

  return data;
};

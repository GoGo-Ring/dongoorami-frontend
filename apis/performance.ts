import {
  ConcertDetail,
  ConcertReviewList,
  PerformanceList,
  PerformanceReviewPost,
  PerformanceReviewUpdate,
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

interface accompaniesSearchParam {
  searchParams: string;
  size: number;
  lastId?: number;
  keyword?: string;
}

export const getPerformancesList = async ({
  searchParams,
  size,
  lastId,
  keyword,
}: accompaniesSearchParam) => {
  const cursorId = lastId ? lastId : '';

  const { data } = await api.get<PerformanceList>({
    url: `/concerts?${searchParams}`,
    params: {
      size,
      cursorId,
      keyword,
    },
  });

  return data;
};

export const createPerformanceReview = async ({
  concertId,
  ...data
}: PerformanceReviewPost) => {
  return await api.post<PerformanceList>({
    url: `/concerts/reviews/${concertId}`,
    data,
  });
};

export const updatePerformanceReview = async ({
  concertReviewId,
  ...data
}: PerformanceReviewUpdate) => {
  return await api.patch<PerformanceList>({
    url: `/concerts/reviews/${concertReviewId}`,
    data,
  });
};

export const deletePerformanceReview = async (concertReviewId: number) => {
  return await api.delete<PerformanceList>({
    url: `/concerts/reviews/${concertReviewId}`,
  });
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

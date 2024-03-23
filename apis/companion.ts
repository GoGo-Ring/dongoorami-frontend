import {
  AccompanyPostInfoList,
  CompanionRecruitmentCardApi,
} from './scheme/accompany';
import {
  AccompaniesPostsConcerts,
  PerformanceInfoListItemApi,
} from './scheme/performance';

import api from '.';

export const getCompanions = async () => {
  const { data } = await api.get<AccompanyPostInfoList>({
    url: '/accompanies/posts',
  });

  return data;
};
interface accompanySearchListParam {
  searchParams?: string;
  size: number;
  lastId?: number;
  keyword?: string;
}
export const getCompanionsList = async ({
  searchParams,
  size,
  lastId,
  keyword,
}: accompanySearchListParam) => {
  const cursorId = lastId ? lastId : '';

  const { data } = await api.get<AccompanyPostInfoList>({
    url: `/accompanies/posts?${searchParams}`,
    params: { size, cursorId, keyword },
  });

  return data;
};

export const getAccompanyList = async <T>({
  concertId,
  size,
}: AccompaniesPostsConcerts) => {
  const { data } = await api.get<T>({
    url: `/accompanies/posts/concerts/${concertId}`,
    params: { size },
  });

  return data;
};

interface CompanionsAccompanyList {
  keyword: string;
  size: number;
  lastId?: number;
}

interface CompanionsAccompanySearchInfoList {
  hasNextAccompanyPost: boolean;
  hasNextConcert: boolean;
  accompanyPostInfos: CompanionRecruitmentCardApi[];
  concertGetShortResponses: PerformanceInfoListItemApi[];
}

export const getCompanionsAccompanyList = async ({
  keyword,
  size,
  lastId,
}: CompanionsAccompanyList) => {
  const cursorId = lastId ? lastId : '';

  const { data } = await api.get<CompanionsAccompanySearchInfoList>({
    url: '/accompanies-concerts',
    params: { keyword, size, cursorId },
  });

  return {
    hasNext: data.hasNextAccompanyPost,
    accompanyPostInfos: data.accompanyPostInfos,
  };
};

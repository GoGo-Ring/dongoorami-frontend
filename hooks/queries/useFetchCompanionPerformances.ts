'use client';

import { useQuery } from '@tanstack/react-query';

import { getPerformanceInfos } from '~/apis/accompany';

const useFetchCompanionPerformances = (keyword: string) => {
  return useQuery({
    queryKey: ['companionPost', keyword],
    queryFn: () => getPerformanceInfos(keyword),
    enabled: !!keyword,
  });
};

export default useFetchCompanionPerformances;

'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getCompanion } from '~/apis/accompany';
import { CompanionDetail } from '~/apis/scheme/accompany';

const useFetchCompanionPost = (accompanyPostId: string) => {
  return useSuspenseQuery<CompanionDetail, AxiosError>({
    queryKey: ['companionPost', accompanyPostId],
    queryFn: () => getCompanion(accompanyPostId),
    refetchOnMount: false,
  });
};

export default useFetchCompanionPost;

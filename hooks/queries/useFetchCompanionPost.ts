'use client';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getCompanion } from '~/apis/accompany';
import { AccompanyPost } from '~/apis/scheme/accompanyDetail';

const useFetchCompanionPost = (accompanyPostId: string, enabled = false) => {
  return useQuery<AccompanyPost, AxiosError>({
    queryKey: ['companionPost', accompanyPostId],
    queryFn: () => getCompanion(accompanyPostId),
    enabled,
  });
};

export default useFetchCompanionPost;

'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getCompanionProfile } from '~/apis/accompany';
import { Profile } from '~/apis/scheme/accompany';

const useFetchProfileById = (id: number) => {
  return useSuspenseQuery<Profile>({
    queryKey: ['member', id],
    queryFn: () => getCompanionProfile(id),
  });
};

export default useFetchProfileById;

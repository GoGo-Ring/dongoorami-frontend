import api from '~/apis';

import { UpdateAccompanyReviews } from './scheme/review';

export const getAccompanyReviews = async <T>(id: number) => {
  const { data } = await api.get<T[]>({
    url: `/accompanies/reviews/reviewees/${id}`,
  });

  return data;
};

export const updateAccompanyReviews = async ({
  id,
  data,
}: UpdateAccompanyReviews) => {
  return await api.patch({
    url: `/accompanies/reviews/${id}`,
    data,
  });
};

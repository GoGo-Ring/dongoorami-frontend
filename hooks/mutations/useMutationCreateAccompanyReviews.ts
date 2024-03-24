import { useMutation } from '@tanstack/react-query';

import { updateAccompanyReviews } from '~/apis/review';
import { UpdateAccompanyReviews } from '~/apis/scheme/review';

const useMutationUpdateAccompanyReviews = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateAccompanyReviews) =>
      updateAccompanyReviews({ id, data }),
  });
};

export default useMutationUpdateAccompanyReviews;

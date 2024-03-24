import { ReviewResponse, SentReview } from './scheme/review';

import api from '.';

export const getReviews = async ({
  id,
  cursorId,
  size = 3,
}: {
  id?: number;
  cursorId: number;
  size?: number;
}) => {
  const { data } = await api.get<ReviewResponse>({
    url: '/accompanies/reviews/reviewees/my-page',
    params: { size, cursorId, id },
  });

  return data;
};

export const getUnsentReviews = async ({
  cursorId,
  size = 3,
}: {
  cursorId: number;
  size?: number;
}) => {
  const { data } = await api.get<{
    hasNext: boolean;
    reviewResponses: SentReview[];
  }>({
    url: '/accompanies/reviews/reviewers/my-page',
    params: {
      size,
      cursorId,
    },
  });

  return data;
};

export const getSentReviews = async () => {
  const { data } = await api.get<SentReview[]>({
    url: '/concerts/accompanies/reviews',
  });

  return data;
};

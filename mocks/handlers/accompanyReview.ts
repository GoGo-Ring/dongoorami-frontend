import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { ReviewTarget } from '~/apis/scheme/accompanyReview';

interface AccompanyReviewFixture {
  current: ReviewTarget[];
  filtered: (id: number) => ReviewTarget[];
}

const accompanyReviewTargetUser: AccompanyReviewFixture = {
  current: [
    {
      id: 11,
      nickname: '김김',
      profileImage: 'image.png',
      gender: '여자',
      age: 24,
      introduction: '안녕하세요~',
      currentMember: false,
      manner: 0,
    },
    {
      id: 12,
      nickname: '이이',
      profileImage: 'image.png',
      gender: '여자',
      age: 24,
      introduction: '안녕하세요~',
      currentMember: false,
      manner: 0,
    },
  ],
  filtered: id =>
    accompanyReviewTargetUser.current.filter(reviewee => reviewee.id === id),
};

interface AccompanyReview {
  current: {
    memberId: number;
    content: string;
    rating: number;
    ratingItemTypes: string[];
  }[];
}

export const getAccompanyReviews = rest.get<AccompanyReviewFixture>(
  `${BASE_URL}/accompanies/reviews/reviewees/:id`,

  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(accompanyReviewTargetUser.current));
  },
);

export const createAccompanyReviews = rest.patch<AccompanyReview>(
  `${BASE_URL}/accompanies/reviews/:id`,

  async (req, res, ctx) => {
    const data = await req.json();

    return res(ctx.status(200), ctx.json(data));
  },
);

const accompanyReviews = [getAccompanyReviews, createAccompanyReviews];

export default accompanyReviews;

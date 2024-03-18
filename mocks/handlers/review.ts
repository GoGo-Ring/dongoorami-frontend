import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { ConcertReviewList } from '~/apis/scheme/performance';

interface ConcertFixture {
  current: ConcertReviewList;
}

const concertReview: ConcertFixture = {
  current: {
    hasNext: false,
    concertReviewGetResponses: [
      ...Array.from({ length: 5 }, (_v, i) => ({
        id: i,
        nickname: `${i}고고링`,
        updatedAt: '2024.03.18',
        title: '기대했던 대로 재밌었어요',
        content:
          '좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용좋아용',
        rating: 0.5 + i,
        isWriter: false,
      })),
    ],
  },
};

export const getConcertReviews = rest.get<ConcertFixture>(
  `${BASE_URL}/concerts/reviews/:id`,

  (_, res, ctx) => res(ctx.status(200), ctx.json(concertReview.current)),
);

const reviewsHandlers = [getConcertReviews];

export default reviewsHandlers;

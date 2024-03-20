import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import {
  ConcertReviewList,
  PerformanceReview,
} from '~/apis/scheme/performance';

interface ConcertFixture {
  current: ConcertReviewList;
  createReview(
    id: number,
    userId: string,
    content: string,
    rating: number,
  ): void;
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
  createReview(concertId, content, title, rating) {
    const newReview = {
      id: concertId,
      nickname: 'new고고링',
      updatedAt: '2024.03.18',
      content,
      title,
      rating,
      isWriter: true,
    };

    this.current.concertReviewGetResponses = [
      ...this.current.concertReviewGetResponses,
      newReview,
    ];
  },
};

export const getConcertReviews = rest.get<ConcertFixture>(
  `${BASE_URL}/concerts/reviews/:id`,

  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(concertReview.current));
  },
);

export const createConcertReviews = rest.post<ConcertFixture>(
  `${BASE_URL}/concerts/reviews/:concertId`,

  async (req, res, ctx) => {
    const { concertId } = req.params;
    const id = parseInt(concertId as string);
    const { content, title, rating } = await req.json<PerformanceReview>();

    if (typeof id !== 'number') {
      return res(ctx.status(404));
    }
    concertReview.createReview(id, content, title, rating);

    return res(ctx.status(200), ctx.json(concertReview.current));
  },
);

const reviews = [getConcertReviews, createConcertReviews];

export default reviews;

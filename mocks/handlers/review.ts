import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { PerformanceReview } from '~/apis/scheme/performance';

interface ConcertReviewItem {
  id: number;
  title: string;
  content: string;
  rating: number;
  nickname: string;
  updatedAt: string;
  isWriter: boolean;
}

interface ConcertReviewList {
  hasNext: boolean;
  concertReviewGetResponses: ConcertReviewItem[];
}

interface ConcertFixture {
  current: ConcertReviewList;
  createReview(content: string, rating: number, title: string): void;
  updateReview(
    id: number,
    content: string,
    rating: number,
    title: string,
  ): void;
  deleteReview(id: number): void;
}

const concertReview: ConcertFixture = {
  current: {
    hasNext: false,
    concertReviewGetResponses: [
      ...Array.from({ length: 5 }, (_v, i) => ({
        id: i,
        concertReviewId: i,
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
  createReview(content, rating, title) {
    const newReview = {
      id: this.current.concertReviewGetResponses.length,
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
  updateReview(id, content, rating, title) {
    const newReview = {
      id,
      nickname: 'new고고링',
      updatedAt: '2024.03.18',
      content,
      title,
      rating,
      isWriter: true,
    };

    const newReviews = this.current.concertReviewGetResponses.map(item =>
      item.id === id ? newReview : item,
    );

    this.current.concertReviewGetResponses = [...newReviews];
  },

  deleteReview(id) {
    const newReviews = this.current.concertReviewGetResponses.filter(
      item => item.id !== id,
    );

    this.current.concertReviewGetResponses = [...newReviews];
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
    concertReview.createReview(content, rating, title);

    return res(ctx.status(200), ctx.json(concertReview.current));
  },
);

export const updateConcertReviews = rest.patch<ConcertFixture>(
  `${BASE_URL}/concerts/reviews/:concertReviewId`,

  async (req, res, ctx) => {
    const { concertReviewId } = req.params;
    const id = parseInt(concertReviewId as string);
    const { content, title, rating } = await req.json<PerformanceReview>();

    if (typeof id !== 'number') {
      return res(ctx.status(404));
    }
    concertReview.updateReview(id, content, rating, title);

    return res(ctx.status(200), ctx.json(concertReview.current));
  },
);

export const deleteConcertReviews = rest.delete<ConcertFixture>(
  `${BASE_URL}/concerts/reviews/:concertReviewId`,

  async (req, res, ctx) => {
    const { concertReviewId } = req.params;

    const id = parseInt(concertReviewId as string);

    if (typeof id !== 'number') {
      return res(ctx.status(404));
    }

    concertReview.deleteReview(id);

    return res(ctx.status(200), ctx.json(concertReview.current));
  },
);

const reviews = [
  getConcertReviews,
  createConcertReviews,
  updateConcertReviews,
  deleteConcertReviews,
];

export default reviews;

import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { ConcertDetail } from '~/apis/scheme/performance';

interface ConcertFixture {
  current: ConcertDetail;
}

const concert: ConcertFixture = {
  current: {
    id: 1,
    name: '공연 제목',
    startedAt: '2024.01.01',
    endedAt: '2024.01.01',
    place: '공연 장소(공연 장소)',
    actor: 'actor',
    crew: '제작진D',
    age: '만 12세 이상',
    runtime: '90분',
    producer: '출연진A',
    agency: '기획사',
    host: '주최',
    management: '주최',
    summary:
      '줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리',

    cost: '30,000원',
    poster: '',
    genre: 'genre',
    status: 'status',
    introductionImages: [''],
    schedule: '월요일 ~ 금요일 (20:00) 토요일 (10:00)',
    totalAccompanies: 1,
    totalReviews: 2,
  },
};

const getConcert = rest.get<ConcertFixture>(
  `${BASE_URL}/concerts/:id`,
  (req, res, ctx) => {
    const { id } = req.params;

    if (id !== '1') {
      return res(ctx.status(400), ctx.json(id));
    }

    return res(ctx.status(200), ctx.json(concert.current));
  },
);

const concertHandlers = [getConcert];

export default concertHandlers;

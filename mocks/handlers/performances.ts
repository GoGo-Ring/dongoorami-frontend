import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { PerformanceInfoListItemApi } from '~/apis/scheme/performance';

interface PerformanceInfoCardFixture {
  current: PerformanceInfoListItemApi[];
}

const info = Array.from({ length: 30 }, (_v, i) => ({
  id: 1,
  poster: '',
  name: `${i}공연 제목1`,
  place: '공연 장소',
  genre: '',
  startedAt: '2024.03.12',
  endedAt: '2024.03.12',
  status: '공연 예정',
}));

const performance: PerformanceInfoCardFixture = {
  current: [
    ...info,
    {
      id: 1,
      poster: '',
      name: '클래식 공연 제목',
      place: '공연 장소',
      genre: '클래식',
      startedAt: '2024.03.12',
      endedAt: '2024.03.12',
      status: '공연 예정',
    },
    {
      id: 1,
      poster: '',
      name: '공연중 공연 제목',
      place: '공연 장소',
      genre: '클래식',
      startedAt: '2024.03.12',
      endedAt: '2024.03.12',
      status: '공연중',
    },
  ],
};

export const getFilteredPerformances = rest.get<PerformanceInfoCardFixture>(
  `${BASE_URL}/search/concerts`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const size = searchParams.get('size');

    if (size === '1') {
      const response = performance.current.filter((_, i) => i < 10);

      return res(
        ctx.status(200),
        ctx.json({ hasNext: true, performanceList: response }),
      );
    }
    if (size === '2') {
      const response = performance.current.filter((_, i) => i >= 10 && i < 20);

      return res(
        ctx.status(201),
        ctx.json({ hasNext: true, performanceList: response }),
      );
    }
    if (size === '3') {
      const response = performance.current.filter((_, i) => i >= 20 && i < 30);

      return res(
        ctx.status(200),
        ctx.json({ hasNext: false, performanceList: response }),
      );
    }

    return res(
      ctx.status(407),
      ctx.json({
        hasNext: false,
        performanceList: [size],
      }),
    );
  },
);

const performanceHandlers = [getFilteredPerformances];

export default performanceHandlers;

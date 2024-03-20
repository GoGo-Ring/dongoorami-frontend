import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { PerformanceInfo } from '~/apis/scheme/accompanyInput';

interface AccompanyPostPerformanceInfoFixture {
  current: PerformanceInfo[];
  getPerformancesByKeyword: (keyword: string) => PerformanceInfo[];
}

const performance: AccompanyPostPerformanceInfoFixture = {
  current: Array.from<{ length: number }, PerformanceInfo>(
    { length: 10 },
    (_, index) => ({
      id: index,
      name: `공연 제목${index}`,
      place: `공연 장소${index}`,
    }),
  ),

  getPerformancesByKeyword: keyword =>
    performance.current.filter(performance =>
      performance.name.includes(keyword),
    ),
};

export const getPerformance = rest.get<PerformanceInfo[]>(
  `${BASE_URL}/concerts/keywords?keyword=:keyword`,
  (req, res, ctx) => {
    const keyword = req.url.searchParams.get('keyword');

    if (!keyword) {
      return res(ctx.status(400));
    }

    const performances = performance.getPerformancesByKeyword(keyword);

    return res(ctx.status(200), ctx.json(performances));
  },
);

const performanceHandlers = [getPerformance];

export default performanceHandlers;

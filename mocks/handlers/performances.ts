import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { PerformanceInfoCard } from '~/apis/scheme/performance';

interface PerformanceInfoCardFixture {
  current: PerformanceInfoCard[] | null;
}

const performance: PerformanceInfoCardFixture = {
  current: [
    {
      id: '1',
      posterSrc: '',
      title: '공연 제목1',
      facilityName: '공연 장소',
      startDate: new Date(),
      status: '공연 예정',
    },
    {
      id: '2',
      posterSrc: '',
      title: '공연 제목2',
      facilityName: '공연 장소',
      startDate: new Date(),
      status: '공연 예정',
    },
    {
      id: '3',
      posterSrc: '',
      title: '공연 제목3',
      facilityName: '공연 장소',
      startDate: new Date(),
      status: '공연 예정',
    },
  ],
};

export const getPerformance = rest.get<PerformanceInfoCard>(
  `${BASE_URL}/search/concerts`,
  (_, res, ctx) => res(ctx.status(200), ctx.json(performance.current)),
);

const performanceHandlers = [getPerformance];

export default performanceHandlers;

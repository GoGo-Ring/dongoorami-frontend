import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { CompanionRecruitmentCard } from '~/apis/scheme/accompany';

interface CompanionRecruitmentCardFixture {
  current: CompanionRecruitmentCard[] | null;
}

const companionRecruitmentCard: CompanionRecruitmentCardFixture = {
  current: [
    {
      title: '콘서트 동행하실 분 구해요1',
      concertName: '콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      title: '콘서트 동행하실 분 구해요2',
      concertName: '콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      title: '콘서트 동행하실 분 구해요3',
      concertName: '콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      title: '콘서트 동행하실 분 구해요4',
      concertName: '콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      title: '콘서트 동행하실 분 구해요5',
      concertName: '콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
  ],
};

export const getCompanion = rest.get<CompanionRecruitmentCardFixture>(
  `${BASE_URL}/search/posts`,
  (_, res, ctx) =>
    res(ctx.status(200), ctx.json(companionRecruitmentCard.current)),
);

const companionHandlers = [getCompanion];

export default companionHandlers;

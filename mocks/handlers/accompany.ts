import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import {
  Companion,
  CompanionDetail,
  CompanionRequest,
  Profile,
} from '~/apis/scheme/accompany';
import { AccompanyPostConcertResponses } from '~/apis/scheme/performance';

interface AccompanyFixture {
  current: CompanionDetail[];
  createCompanion(newCompanion: CompanionDetail): void;
  updateCompanion(id: string, content: Partial<CompanionRequest>): boolean;
  deleteCompanion(id: string): void;
  getMemberProfile(memberId: number): Profile | null;
}

const accompanyList = [
  ...Array.from({ length: 40 }, i => ({
    id: `${i}`,
    title: `${i}서울 같이 갈 울싼 사람 구합니다~~`,
    writer: '김뫄뫄',
    createdAt: '2024-03-18T01:17:39.692638',
    updatedAt: '2024-03-14T16:23:31.229165',
    status: '모집 중',
    concertName: '고고링 백걸즈의 스프링 탐방기',
    viewCount: 0,
    commentCount: 0,
    gender: '여',
    totalPeople: 1,
  })),
  {
    id: '99',
    title: '99울싼 같이 갈 서울 사람 구합니다~~',
    writer: '김뫄뫄',
    createdAt: '2024-03-18T01:17:39.692638',
    updatedAt: '2024-03-14T16:23:31.229165',
    status: '모집 중',
    concertName: '고고링 JS 탐방기',
    viewCount: 0,
    commentCount: 0,
    gender: '남',
    totalPeople: 1,
  },
];

const accompany: AccompanyFixture = {
  current: [
    {
      accompanyPostId: '1',
      concertName: 'Sample Concert',
      image: 'https://picsum.photos/200',
      name: 'John Doe',
      title: 'Looking for a companion',
      updatedAt: '2022-01-01T00:00:00Z',
      content: 'Looking for a companion to go to the Sample Concert with me.',
      endDate: '2022-12-31',
      endAge: 30,
      gender: '무관',
      region: '서울',
      startDate: '2022-01-01',
      startAge: 20,
      totalPeople: 2,
      viewCount: 100,
      waitingCount: 5,
      status: '모집중',
      concertLocation: '서울시 강남구 역삼동 123-45',
      transportation: '동행',
      memberInfo: {
        id: 7,
        profileImage: 'https://picsum.photos/200',
        nickname: 'John Doe',
        gender: '남자',
        age: 5,
        introduction: '',
        currentMember: false,
      },
    },
  ],

  createCompanion(newCompanion: CompanionDetail) {
    this.current.push(newCompanion);
  },

  updateCompanion(id: string, content: Partial<CompanionRequest>) {
    const companionIndex = accompany.current.findIndex(
      companion => companion.accompanyPostId === id,
    );

    if (companionIndex === -1) {
      return false;
    }

    this.current[companionIndex] = {
      ...this.current[companionIndex],
      ...content,
    };

    return true;
  },

  deleteCompanion(id: string) {
    const companionIndex = this.current.findIndex(
      companion => companion.accompanyPostId === id,
    );

    if (companionIndex === -1) {
      return;
    }

    this.current.splice(companionIndex, 1);
  },

  getMemberProfile(memberId: number) {
    return (
      this.current.find(companion => companion.memberInfo.id === memberId)
        ?.memberInfo || null
    );
  },
};

const getCompanions = rest.get<Companion[]>(
  `${BASE_URL}/accompanies/posts`,
  (req, res, ctx) => {
    const size = req.url.searchParams.get('size');
    const paramsGender = req.url.searchParams.get('gender');
    const paramsRegion = req.url.searchParams.get('region');

    if (paramsGender === 'male') {
      const filtered = {
        hasNext: false,
        accompanyPostInfos: accompanyList.filter(
          ({ gender }) => gender === '남',
        ),
      };

      return res(ctx.status(200), ctx.json(filtered));
    }
    if (paramsRegion) {
      const filtered = {
        hasNext: false,
        accompanyPostInfos: accompanyList.filter(
          ({ gender }) => gender === paramsRegion,
        ),
      };

      return res(ctx.status(200), ctx.json(filtered));
    }

    if (size) {
      const nSize = parseInt(size);
      const filtered = {
        hasNext: true,
        accompanyPostInfos: accompanyList.filter(
          (_v, i) => nSize <= i && nSize * 10 > i,
        ),
      };

      if (size === '4') {
        filtered.hasNext = false;
      }

      return res(ctx.status(200), ctx.json(filtered));
    }

    return res(ctx.status(404));
  },
);

const accompanyRecruitmentList = {
  hasNext: false,
  accompanyPostConcertResponses: [
    ...Array.from({ length: 5 }, i => ({
      title: `${i}서울 같이 갈 울싼 사람 구합니다~~`,
      nickname: '김뫄뫄',
      updatedAt: '2024.03.22',
      content: '고고링 백걸즈의 스프링 탐방기',
      viewCount: 0,
      commentCount: 0,
    })),
  ],
};

const getConcertAccompanyList = rest.get<AccompanyPostConcertResponses>(
  `${BASE_URL}/accompanies/posts/concerts/:id`,
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(accompanyRecruitmentList));
  },
);

const accompanyHandlers = [getCompanions, getConcertAccompanyList];

export default accompanyHandlers;

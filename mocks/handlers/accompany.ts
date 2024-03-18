import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import {
  Companion,
  CompanionDetail,
  CompanionRequest,
  Profile,
} from '~/apis/scheme/accompany';

interface AccompanyFixture {
  current: CompanionDetail[];
  createCompanion(newCompanion: CompanionDetail): void;
  updateCompanion(id: string, content: Partial<CompanionRequest>): boolean;
  deleteCompanion(id: string): void;
  getMemberProfile(memberId: number): Profile | null;
}

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
        name: 'John Doe',
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
  (_, res, ctx) => res(ctx.status(200), ctx.json(accompany.current)),
);

const memberHandlers = [getCompanions];

export default memberHandlers;

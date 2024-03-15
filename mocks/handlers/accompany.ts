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

const getCompanion = rest.get<CompanionDetail>(
  `${BASE_URL}/accompanies/posts/:id`,
  (req, res, ctx) => {
    const { id } = req.params;
    const companion = accompany.current.find(
      companion => companion.accompanyPostId === id,
    );

    if (!companion) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(companion));
  },
);

const createCompanion = rest.post(
  `${BASE_URL}/accompanies/posts`,
  async (req, res, ctx) => {
    const newCompanion = (await req.json()) as CompanionRequest;
    const { user } = req.cookies;

    accompany.current.push({
      ...newCompanion,
      accompanyPostId: new Date().toISOString(),
      name: user || '프롱이',
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      waitingCount: 0,
      concertLocation: 'Seoul',
      transportation: '미동행',
      memberInfo: {
        profileImage: 'https://picsum.photos/200',
        name: '',
        gender: '남자',
        age: 5,
        introduction: '',
        id: 7,
        currentMember: false,
      },
      status: '모집중',
    });

    return res(ctx.status(201));
  },
);

const updateCompanion = rest.patch(
  `${BASE_URL}/accompanies/posts/:id`,
  async (req, res, ctx) => {
    const { id } = req.params;
    const content = (await req.json()) as Partial<CompanionRequest>;

    accompany.updateCompanion(id as string, content);

    return res(ctx.status(204));
  },
);

const deleteCompanion = rest.delete(
  `${BASE_URL}/accompanies/posts/:id`,
  (req, res, ctx) => {
    const { id } = req.params;

    accompany.deleteCompanion(id as string);

    return res(ctx.status(204));
  },
);

const getCompanionProfile = rest.get<Profile>(
  `${BASE_URL}/accompanies/profile/:id`,
  (req, res, ctx) => {
    const { id } = req.params;
    const member = accompany.getMemberProfile(Number(id));

    if (!member) {
      return res(ctx.status(404));
    }

    if (String(member.id) === (id as string)) {
      member.currentMember = false;
    }

    return res(ctx.status(200), ctx.json(member));
  },
);

const memberHandlers = [
  getCompanions,
  getCompanion,
  createCompanion,
  updateCompanion,
  deleteCompanion,
  getCompanionProfile,
];

export default memberHandlers;

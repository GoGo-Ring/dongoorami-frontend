import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { AccompanyPost } from '~/apis/scheme/accompanyDetail';

interface AccompanyFixture {
  current: AccompanyPost[];
  createCompanion(newCompanion: AccompanyPost): void;
  updateCompanion(id: number, content: Partial<AccompanyPost>): boolean;
  deleteCompanion(id: number): void;
}

const accompany: AccompanyFixture = {
  current: [
    {
      id: 12,
      title: '서울 같이 갈 울싼 사람 구합니다~~',
      memberProfile: {
        id: 14,
        nickname: '김뫄뫄',
        profileImage: 'https://picsum.photos/200',
        gender: '여자',
        age: 24,
        introduction: '안녕하세요~',
        currentMember: true,
      },
      createdAt: '2024-03-13T06:24:19.741498',
      updatedAt: '2024-03-13T06:24:19.761718168',
      viewCount: 1,
      commentCount: 0,
      status: '모집 중',
      concertName: '2024 SG워너비 콘서트 : 우리의 노래',
      concertPlace: 'KSPO DOME',
      region: '수도권(경기, 인천 포함)',
      startAge: 23,
      endAge: 37,
      totalPeople: 2,
      gender: '여',
      startDate: '2024-03-22',
      endDate: '2024-03-22',
      waitingCount: 0,
      content: '같이 올라갈 사람 구해요~',
      images: [
        'https://picsum.photos/200?random=1',
        'https://picsum.photos/200?random=2',
        'https://picsum.photos/200?random=3',
      ],
      isWish: true,
      isWriter: true,
      purposes: ['숙박', '이동'],
    },
    {
      id: 13,
      title: '서울 같이 갈 경기도 사람 구합니다~~',
      memberProfile: {
        id: 12,
        nickname: '아무무',
        profileImage: 'https://picsum.photos/200',
        gender: '남자',
        age: 25,
        introduction: '안녕하세요~',
        currentMember: false,
      },
      createdAt: '2024-03-13T06:24:19.741498',
      updatedAt: '2024-03-13T06:24:19.761718168',
      viewCount: 1,
      commentCount: 0,
      status: '모집 중',
      concertName: '2024 SG워너비 콘서트 : 우리의 마법',
      concertPlace: 'KSPO DOME',
      region: '수도권(경기, 인천 포함)',
      startAge: 23,
      endAge: 37,
      totalPeople: 2,
      gender: '남',
      startDate: '2024-03-22',
      endDate: '2024-03-22',
      waitingCount: 0,
      content: '같이 올라갈 사람 구해요~',
      images: [
        'https://picsum.photos/200?random=1',
        'https://picsum.photos/200?random=2',
        'https://picsum.photos/200?random=3',
      ],
      isWish: true,
      isWriter: true,
      purposes: ['숙박', '이동'],
    },
  ],

  createCompanion(newCompanion) {
    this.current.push(newCompanion);
  },

  updateCompanion(id, content) {
    const companionIndex = accompany.current.findIndex(
      companion => companion.id === id,
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

  deleteCompanion(id) {
    const companionIndex = this.current.findIndex(
      companion => companion.id === id,
    );

    if (companionIndex === -1) {
      return;
    }

    this.current.splice(companionIndex, 1);
  },
};
const getCompanion = rest.get<AccompanyPost>(
  `${BASE_URL}/accompanies/posts/:id`,
  (req, res, ctx) => {
    const { id } = req.params;
    const companion = accompany.current.find(companion => companion.id === +id);

    if (!companion) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(companion));
  },
);

const createCompanion = rest.post(
  `${BASE_URL}/accompanies/posts`,
  async (req, res, ctx) => {
    const newCompanion = (await req.json()) as AccompanyPost;

    accompany.current.push(newCompanion);

    return res(ctx.status(201));
  },
);

const updateCompanion = rest.patch(
  `${BASE_URL}/accompanies/posts/:id`,
  async (req, res, ctx) => {
    const { id } = req.params;
    const content = (await req.json()) as AccompanyPost;

    accompany.updateCompanion(+id, content);

    return res(ctx.status(204));
  },
);

const deleteCompanion = rest.delete(
  `${BASE_URL}/accompanies/posts/:id`,
  (req, res, ctx) => {
    const { id } = req.params;

    accompany.deleteCompanion(+id);

    return res(ctx.status(204));
  },
);

const accompanyDetailHandlers = [
  getCompanion,
  createCompanion,
  updateCompanion,
  deleteCompanion,
];

export default accompanyDetailHandlers;

import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { Member } from '~/apis/scheme/member';

interface MemberFixture {
  current: Member | null;
  updateMember(newMember: Member): void;
  withdrawMember(): void;
}

const member: MemberFixture = {
  current: {
    profileImage: 'https://picsum.photos/seed/picsum/200/300',
    name: '최정은',
    nickname: '백둥이',
    gender: '여',
    birthdate: '1993.09.17',
    mannerTemperature: 99,
    introduction: '~~~',
  },

  updateMember(newMember: typeof member.current) {
    this.current = newMember;
  },

  withdrawMember() {
    this.current = null;
  },
};

const getMember = rest.get<Member>(`${BASE_URL}/members`, (_, res, ctx) =>
  res(ctx.status(200), ctx.json(member.current)),
);

const updateMember = rest.patch(
  `${BASE_URL}/members`,
  async (req, res, ctx) => {
    const newMember = (await req.json()) as Member;

    member.updateMember({ ...member.current, ...newMember });

    return res(ctx.status(204));
  },
);

const updateProfileImage = rest.patch(
  `${BASE_URL}/members/profileImage`,
  async (req, res, ctx) => {
    const newProfileImage = (await req.json()) as string;

    if (member.current === null) {
      return res(ctx.status(400));
    }

    member.current.profileImage = newProfileImage;

    return res(ctx.status(204));
  },
);

const withdrawMember = rest.delete(`${BASE_URL}/members`, (_, res, ctx) => {
  member.withdrawMember();

  return res(ctx.status(204));
});

const memberHandlers = [
  getMember,
  updateMember,
  updateProfileImage,
  withdrawMember,
];

export default memberHandlers;

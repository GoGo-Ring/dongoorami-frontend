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
    age: 25,
    manner: 99,
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

const getProfile = rest.get<Member>(
  `${BASE_URL}/accompanies/profile/:id`,
  (_, res, ctx) => res(ctx.status(200), ctx.json(member.current)),
);

// const updateProfileImage = rest.patch(
//   `${BASE_URL}/profileImage`,
//   async (req, res, ctx) => {
//     const newProfileImage = (await req.json()) as string;

//     if (member.current === null) {
//       return res(ctx.status(400));
//     }

//     member.current.profileImage = newProfileImage;

//     return res(ctx.status(204));
//   },
// );

const withdrawMember = rest.delete(`${BASE_URL}/members`, (_, res, ctx) => {
  member.withdrawMember();

  return res(ctx.status(204));
});

const memberHandlers = [withdrawMember, getProfile, getMember];

export default memberHandlers;

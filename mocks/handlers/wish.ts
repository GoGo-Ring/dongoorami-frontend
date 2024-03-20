import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { WishResponse } from '~/apis/scheme/wish';

interface WishFixture {
  current: WishResponse;
  getWishes(size: number, page: number): WishResponse;
}

const Wish: WishFixture = {
  current: {
    hasNext: true,
    wishGetResponses: Array.from({ length: 30 }, (_, i) => ({
      wishId: i + 1,
      title: `안녕하세요 ${i + 1}`,
      content: `안녕하세요 ${i + 1}`,
      updatedAt: `2021-09-${17 + i}`,
      accompanyPostId: 1,
      totalPeople: 8,
    })),
  },
  getWishes(cursorId, size = 2) {
    const start =
      cursorId !== 0
        ? this.current.wishGetResponses.findIndex(
            wish => wish.wishId === cursorId,
          ) + 1
        : 0;
    const end = start + size;
    const hasNext =
      this.current.wishGetResponses[end].wishId <
      (this.current.wishGetResponses.at(-1)?.wishId || 1);

    return {
      hasNext,
      wishGetResponses: this.current.wishGetResponses.slice(start, end),
    };
  },
};

const getWishes = rest.get<WishResponse>(
  `${BASE_URL}/wishes`,
  async (req, res, ctx) => {
    const cursorId = req.url.searchParams.get('cursorId') || 0;
    const size = req.url.searchParams.get('size') || 2;

    const wishes = Wish.getWishes(+cursorId, +size);

    return res(ctx.status(200), ctx.json(wishes));
  },
);

const wishHandlers = [getWishes];

export default wishHandlers;

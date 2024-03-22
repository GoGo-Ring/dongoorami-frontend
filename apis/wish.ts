import { WishResponse } from './scheme/wish';

import api from '.';

export const getWishes = async (cursorId: number, size = 3) => {
  const { data } = await api.get<WishResponse>({
    url: '/wishes',
    params: { size, cursorId },
  });

  return data;
};

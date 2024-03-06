import { MessageWithPage } from './scheme/message';

import api from '.';

export const getMessages = async (size: number, page: number) => {
  const { data } = await api.get<MessageWithPage>({
    url: '/messages',
    params: { size, page },
  });

  return data;
};

export const updateMessage = async (id: number) => {
  await api.patch({ url: `/messages/${id}` });
};

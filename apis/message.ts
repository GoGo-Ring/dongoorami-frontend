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

export const createMessage = async ({
  partnerId,
  content,
}: {
  partnerId: number;
  content: string;
}) => {
  await api.post({
    url: '/messages',
    data: { partnerId, content },
  });
};

export const getMessagesById = async ({
  partnerId,
  size,
  cursorId,
}: {
  partnerId: number;
  size: number;
  cursorId?: number;
}) => {
  const { data } = await api.get<MessageWithPage>({
    url: `/messages/${partnerId}`,
    params: { size, cursorId },
  });

  return data;
};

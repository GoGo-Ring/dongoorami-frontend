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
  senderId,
  receiverId,
  content,
  accompanyPostId,
}: {
  senderId: number;
  receiverId: number;
  content: string;
  accompanyPostId?: number;
}) => {
  await api.post({
    url: '/messages',
    data: { senderId, receiverId, content, accompanyPostId },
  });
};

export const getMessagesById = async (
  id: number,
  size: number,
  page: number,
) => {
  const { data } = await api.get<MessageWithPage>({
    url: `/messages/${id}`,
    params: { size, page },
  });

  return data;
};

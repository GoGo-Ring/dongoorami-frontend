import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { Message, MessageWithPage } from '~/apis/scheme/message';

interface MessageFixture {
  current: MessageWithPage;
  getMessages(size: number, page: number): MessageWithPage;
  updateMessage(id: number): void;
}

const message: MessageFixture = {
  current: {
    allPage: 6,
    messages: [
      {
        id: 1,
        accompanyPostId: 1,
        senderId: 1,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 2,
        accompanyPostId: 1,
        senderId: 2,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 3,
        accompanyPostId: 1,
        senderId: 3,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 4,
        accompanyPostId: 1,
        senderId: 4,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 5,
        accompanyPostId: 1,
        senderId: 5,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 6,
        accompanyPostId: 1,
        senderId: 6,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
    ],
  },
  getMessages(size: number, page: number) {
    const start = (page - 1) * size;
    const end = start + size;

    return {
      ...this.current,
      messages: this.current.messages.slice(start, end),
    };
  },
  updateMessage(id: number) {
    const index = this.current.messages.findIndex(message => message.id === id);

    this.current.messages[index].isRead = true;
  },
};

const getMessages = rest.get<Message[]>(
  `${BASE_URL}/messages?:page`,
  (req, res, ctx) => {
    const size = 1;
    const page = req.url.searchParams.get('page') || 1;

    const messages = message.getMessages(+size, +page);

    return res(ctx.status(200), ctx.json(messages));
  },
);

const updateMessage = rest.patch(
  `${BASE_URL}/messages/:id`,
  (req, res, ctx) => {
    const { id } = req.params;

    message.updateMessage(+id);

    return res(ctx.status(204));
  },
);

const messageHandlers = [getMessages, updateMessage];

export default messageHandlers;

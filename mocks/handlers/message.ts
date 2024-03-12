import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { Message, MessageWithPage } from '~/apis/scheme/message';

interface MessageFixture {
  current: MessageWithPage;
  getMessages(size: number, page: number): MessageWithPage;
  updateMessage(id: number): void;
  createMessage(
    senderId: number,
    receiverId: number,
    content: string,
    accompanyPostId?: number,
  ): void;
}

const message: MessageFixture = {
  current: {
    allPage: 6,
    messages: [
      {
        id: 1,
        accompanyPostId: 1,
        senderId: 1,
        receiverId: 2,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 2,
        accompanyPostId: 1,
        senderId: 2,
        receiverId: 2,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 3,
        accompanyPostId: 1,
        senderId: 3,
        receiverId: 2,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 4,
        accompanyPostId: 1,
        senderId: 4,
        receiverId: 2,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 5,
        accompanyPostId: 1,
        senderId: 5,
        receiverId: 2,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      {
        id: 6,
        accompanyPostId: 1,
        senderId: 6,
        receiverId: 2,
        content: '안녕하세요',
        date: '2021-09-17',
        isRead: false,
      },
      ...Array(5)
        .fill(0)
        .map((_, i) => ({
          id: i + 7,
          accompanyPostId: 1,
          senderId: 7,
          receiverId: 1,
          content: '안녕하세요',
          date: '2021-09-17',
          isRead: false,
        })),
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
  createMessage(senderId, receiverId, content, accompanyPostId) {
    const newMessage = {
      id: this.current.messages.length + 1,
      accompanyPostId: accompanyPostId || 1,
      senderId,
      receiverId,
      content,
      date: new Date().toISOString(),
      isRead: false,
    };

    this.current.messages.unshift(newMessage);
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

const getMessagesById = rest.get<Message[]>(
  `${BASE_URL}/messages/:id`,
  (req, res, ctx) => {
    const { id } = req.params;
    const myId = 1; // TODO: 로그인 정보에서 가져오기
    const page = req.url.searchParams.get('page') || 1;
    const size = req.url.searchParams.get('size') || 10;

    const data = message.getMessages(+size, +page);
    const messages = data.messages.filter(
      message =>
        (message.senderId === +id && message.receiverId === +myId) ||
        (message.senderId === +myId && message.receiverId === +id),
    );

    const result = { ...data, messages };

    return res(ctx.status(200), ctx.json(result));
  },
);

const createMessage = rest.post(
  `${BASE_URL}/messages`,
  async (req, res, ctx) => {
    const { senderId, receiverId, content, accompanyPostId } =
      (await req.json()) as Pick<
        Message,
        'senderId' | 'receiverId' | 'content' | 'accompanyPostId'
      >;

    message.createMessage(senderId, receiverId, content, accompanyPostId);

    return res(ctx.status(201), ctx.json(message.current.messages));
  },
);

const messageHandlers = [
  getMessages,
  updateMessage,
  getMessagesById,
  createMessage,
];

export default messageHandlers;

import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { Message, MessageWithPage } from '~/apis/scheme/message';

interface MessageFixture {
  current: MessageWithPage;
  getMessages(size: number, page: number): MessageWithPage;
  updateMessage(id: number): void;
  createMessage(receiverId: number, content: string): void;
}

const MY_ID = 7;

const message: MessageFixture = {
  current: {
    hasNext: false,
    messageResponses: [
      ...Array.from<unknown, Message>({ length: 10 }, (_, i) => ({
        id: i + 2,
        partner: {
          id: (i % 2) + MY_ID,
          nickname: i % 2 === 0 ? '백둥이' : '흰둥이',
          profileImage: 'https://picsum.photos/200/300?grayscale',
          gender: (i % 2) + MY_ID === MY_ID ? '여자' : '남자',
          age: i % 2 === 0 ? 25 : 26,
          introduction: '안녕하세요',
          currentMember: false,
          manner: 0,
        },
        content: '안녕하세요',
        createdAt: '2021-09-17',
        hasUnRead: true,
        myMessage: (i % 2) + MY_ID === MY_ID,
      })),
    ],
  },
  getMessages(size: number, page: number) {
    const start = (page - 1) * size;
    const end = start + size;

    return {
      ...this.current,
      messages: this.current.messageResponses.slice(start, end),
    };
  },
  updateMessage(id: number) {
    const index = this.current.messageResponses.findIndex(
      message => message.id === id,
    );

    this.current.messageResponses[index].hasUnRead = false;
  },
  createMessage(receiverId, content) {
    const newMessage = {
      id: this.current.messageResponses.length + 1,
      partner: { ...this.current.messageResponses[0].partner, id: receiverId },
      content,
      createdAt: new Date().toISOString(),
      hasUnRead: true,
      myMessage: true,
    };

    this.current.messageResponses.unshift(newMessage);
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

const getMessagesById = rest.get<MessageWithPage>(
  `${BASE_URL}/messages/:id`,
  (req, res, ctx) => {
    const { id } = req.params;
    const size = req.url.searchParams.get('size');
    const cursorId = req.url.searchParams.get('cursorId');

    const data = message.getMessages(Number(size) || 10, Number(cursorId) || 1);
    const messages = data.messageResponses.filter(
      message => message.partner.id === +id,
    );

    const result = { ...data, messages };

    return res(ctx.status(200), ctx.json(result));
  },
);

const createMessage = rest.post(
  `${BASE_URL}/messages`,
  async (req, res, ctx) => {
    const { partnerId, content } = (await req.json()) as {
      partnerId: number;
      content: string;
    };

    message.createMessage(partnerId, content);

    return res(ctx.status(201), ctx.json(message.current.messageResponses));
  },
);

const messageHandlers = [
  getMessages,
  updateMessage,
  getMessagesById,
  createMessage,
];

export default messageHandlers;

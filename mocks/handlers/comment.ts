import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { Comment } from '~/apis/scheme/comment';

const currentUserId = '14';

interface CommentFixture {
  current: Comment[];
  getComments(): Comment[] | undefined;
  createComment(
    userId: string,
    content: string,
    isAccompanyApplyComment?: boolean,
  ): void;
  updateComment(userId: string, content: string): void;
  updateCommentInfos(userId: string, infos: Partial<Comment>): void;
  deleteComment(userId: string): void;
}
const comment: CommentFixture = {
  current: [
    {
      id: 11,
      memberProfile: {
        id: +currentUserId,
        nickname: '김뫄뫄',
        profileImage: 'https://picsum.photos/200?random=1',
        gender: '여자',
        age: 24,
        introduction: '안녕하세요~',
        currentMember: true,
      },
      content: '가는 길만 동행해도 괜찮을까요!?',
      isAccompanyApplyComment: false,
      isAccompanyConfirmedComment: false,
      createdAt: '2024-03-13T06:24:20.767104',
      updatedAt: '2024-03-13T06:24:20.767104',
    },
    {
      id: 12,
      memberProfile: {
        id: 15,
        nickname: '박초롱',
        profileImage: 'https://picsum.photos/200?random?=2',
        gender: '남자',
        age: 27,
        introduction: '함께 여행을 즐겨요!',
        currentMember: false,
      },
      content: '물론이죠! 어디로 가시나요?',
      isAccompanyApplyComment: false,
      isAccompanyConfirmedComment: false,
      createdAt: '2024-03-13T06:30:45.123456',
      updatedAt: '2024-03-13T06:30:45.123456',
    },
    ...Array.from<unknown, Comment>(
      {
        length: 4,
      },
      (_, index) => ({
        id: 13 + index,
        memberProfile: {
          id: 15 + index,
          nickname: `김 ${index}`,
          profileImage: `https://picsum.photos/200?random?=${index + currentUserId}`,
          gender: index % 2 === 0 ? '여자' : '남자',
          age: 24 + index,
          introduction: '안녕하세요~',
          currentMember: currentUserId === String(15 + index),
        },
        content: '',
        isAccompanyApplyComment: true,
        isAccompanyConfirmedComment: false,
        createdAt: '2024-03-13T06:35:20.789012',
        updatedAt: '2024-03-13T06:35:20.789012',
      }),
    ),
  ],

  getComments() {
    return this.current;
  },

  createComment(userId, content, isAccompanyApplyComment = false) {
    const newComment = {
      id: this.current.length + 17,
      memberProfile: {
        id: Number(userId),
        nickname: '김뫄뫄',
        profileImage: 'https://picsum.photos/200?random=1',
        gender: '여자' as const,
        age: 24,
        introduction: '안녕하세요~',
        currentMember: currentUserId === userId,
      },
      content,
      isAccompanyApplyComment,
      isAccompanyConfirmedComment: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.current = [newComment, ...this.current];
  },
  updateComment(commentId, content) {
    const targetComment = this.current.find(
      comment => comment.id === Number(commentId),
    );

    if (targetComment) {
      targetComment.content = content;
      targetComment.updatedAt = new Date().toISOString();
    }
  },
  updateCommentInfos(commentId, infos) {
    const targetIndex = this.current.findIndex(
      comment => comment.id === Number(commentId),
    );

    if (targetIndex) {
      this.current.splice(targetIndex, 1, {
        ...this.current[targetIndex],
        ...infos,
      });
    }
  },
  deleteComment(commentId) {
    this.current = this.current.filter(
      comment => comment.id !== Number(commentId),
    );
  },
};

const getComments = rest.get<Comment[]>(
  `${BASE_URL}/accompanies/comments/:accompanyPostId`,
  (req, res, ctx) => {
    const { accompanyPostId } = req.params;

    if (typeof accompanyPostId !== 'string') {
      return res(ctx.status(400));
    }

    return res(ctx.status(200), ctx.json(comment.getComments()));
  },
);

const createComment = rest.post<Comment>(
  `${BASE_URL}/accompanies/comments/:accompanyPostId`,
  async (req, res, ctx) => {
    const { accompanyPostId } = req.params;
    const { content } = (await req.json()) as {
      content: string;
    };

    if (typeof accompanyPostId !== 'string' || typeof content !== 'string') {
      return res(ctx.status(400));
    }

    comment.createComment(currentUserId, content);

    return res(ctx.status(201), ctx.json(content));
  },
);

const updateComment = rest.patch<Comment>(
  `${BASE_URL}/accompanies/comments/:commentId`,
  async (req, res, ctx) => {
    const { commentId } = req.params;
    const { content } = (await req.json()) as { content: string };

    if (typeof commentId !== 'string' || typeof content !== 'string') {
      return res(ctx.status(400));
    }

    comment.updateComment(commentId, content);

    return res(ctx.status(200));
  },
);

const deleteComment = rest.delete<Comment>(
  `${BASE_URL}/accompanies/comments/:commentId`,
  async (req, res, ctx) => {
    const { commentId } = req.params;

    if (typeof commentId !== 'string') {
      return res(ctx.status(400));
    }

    comment.deleteComment(commentId);

    return res(ctx.status(200));
  },
);

const createAcompanyApplyComment = rest.post(
  `${BASE_URL}/accompanies/:accompanyPostId`,
  async (req, res, ctx) => {
    const { accompanyPostId } = req.params;

    if (typeof accompanyPostId !== 'string') {
      return res(ctx.status(400));
    }

    comment.createComment(currentUserId, '동행 신청을 하였습니다.', true);

    return res(ctx.status(201));
  },
);

const confirmCompanion = rest.patch(
  `${BASE_URL}/accompanies/:commentId`,
  (req, res, ctx) => {
    const { commentId } = req.params;

    comment.updateCommentInfos(String(commentId), {
      isAccompanyConfirmedComment: true,
    });

    return res(ctx.status(204));
  },
);

const handlers = [
  getComments,
  createComment,
  updateComment,
  deleteComment,
  createAcompanyApplyComment,
  confirmCompanion,
];

export default handlers;

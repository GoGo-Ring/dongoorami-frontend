import { rest } from 'msw';

import { BASE_URL } from '~/apis';
import { Comment } from '~/apis/scheme/comment';

interface CurrentComment extends Comment {
  accompanyPostId: number;
}

interface CommentFixture {
  current: CurrentComment[];
  getComments(accompanyPostId: string): CurrentComment[] | undefined;
  createComment(accompanyPostId: string, userId: string, content: string): void;
  updateComment(accompanyPostId: string, userId: string, content: string): void;
  deleteComment(accompanyPostId: string, userId: string): void;
}
const comment: CommentFixture = {
  current: [
    {
      accompanyPostId: 1,
      id: 1,
      content: 'Sample Comment',
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
      memberId: 1,
      memberName: 'John Doe',
    },
  ],

  getComments(accompanyPostId: string) {
    return this.current.filter(
      comment => comment.accompanyPostId === Number(accompanyPostId),
    );
  },

  createComment(accompanyPostId, userId, content) {
    const randomId = Math.floor(Math.random() * 1000);

    const newComment: CurrentComment = {
      accompanyPostId: Number(accompanyPostId),
      id: randomId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      memberId: Number(userId),
      memberName: `John Doe ${userId}`,
    };

    this.current = [...this.current, newComment];
  },
  updateComment(accompanyPostId, commentId, content) {
    const targetComment = this.current.find(
      comment =>
        comment.accompanyPostId === Number(accompanyPostId) &&
        comment.id === Number(commentId),
    );

    if (targetComment) {
      targetComment.content = content;
      targetComment.updatedAt = new Date().toISOString();
    }
  },
  deleteComment(accompanyPostId, commentId) {
    this.current = this.current.filter(
      comment =>
        comment.accompanyPostId !== Number(accompanyPostId) ||
        comment.id !== Number(commentId),
    );
  },
};

const getComments = rest.get<Comment[]>(
  `${BASE_URL}/comments/:accompanyPostId`,
  (req, res, ctx) => {
    const { accompanyPostId } = req.params;

    if (typeof accompanyPostId !== 'string') {
      return res(ctx.status(400));
    }

    return res(ctx.status(200), ctx.json(comment.getComments(accompanyPostId)));
  },
);

const createComment = rest.post<Comment>(
  `${BASE_URL}/comments/:accompanyPostId`,
  async (req, res, ctx) => {
    const { accompanyPostId } = req.params;
    const { content, userId } = (await req.json()) as {
      content: string;
      userId: string;
    };

    if (
      typeof accompanyPostId !== 'string' ||
      typeof content !== 'string' ||
      typeof userId !== 'string'
    ) {
      return res(ctx.status(400));
    }

    comment.createComment(accompanyPostId, userId, content);

    return res(ctx.status(201), ctx.json(content));
  },
);

const updateComment = rest.patch<Comment>(
  `${BASE_URL}/comments/:accompanyPostId/:commentId`,
  async (req, res, ctx) => {
    const { accompanyPostId, commentId } = req.params;
    const { content } = (await req.json()) as { content: string };

    if (
      typeof accompanyPostId !== 'string' ||
      typeof commentId !== 'string' ||
      typeof content !== 'string'
    ) {
      return res(ctx.status(400));
    }

    comment.updateComment(accompanyPostId, commentId, content);

    return res(ctx.status(200));
  },
);

const deleteComment = rest.delete<Comment>(
  `${BASE_URL}/comments/:accompanyPostId/:commentId`,
  async (req, res, ctx) => {
    const { accompanyPostId, commentId } = req.params;

    if (typeof accompanyPostId !== 'string' || typeof commentId !== 'string') {
      return res(ctx.status(400));
    }

    comment.deleteComment(accompanyPostId, commentId);

    return res(ctx.status(200));
  },
);

const handlers = [getComments, createComment, updateComment, deleteComment];

export default handlers;

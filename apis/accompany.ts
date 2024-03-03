import {
  Companion,
  CompanionDetail,
  CompanionRequest,
} from './scheme/accompany';

import api from '.';

// 동행 구인
export const createCompanion = async (companion: CompanionRequest) =>
  await api.post({
    url: '/accompanies/posts',
    data: companion,
  });

export const getCompanions = async () => {
  const { data } = await api.get<Companion[]>({ url: '/accompanies/posts' });

  return data;
};

export const getCompanion = async (accompanyPostId: string) => {
  const { data } = await api.get<CompanionDetail>({
    url: `/accompanies/posts/${accompanyPostId}`,
  });

  return data;
};

export const deleteCompanion = async (accompanyPostId: string) =>
  await api.delete({ url: `/accompanies/posts/${accompanyPostId}` });

export const updateCompanion = async (
  accompanyPostId: string,
  companion: Partial<CompanionRequest>,
) =>
  await api.patch({
    url: `/accompanies/posts/${accompanyPostId}`,
    data: companion,
  });

export const getCompanionProfile = async (memberId: number) =>
  await api.get({ url: `/profiles/${memberId}` });

export const createComment = async (content: string) =>
  await api.post({
    url: '/comments}',
    data: { content },
  });

export const getComments = async (accompanyPostId: string) =>
  await api.get({
    url: `/comments/${accompanyPostId}`,
  });
export const updateComment = async (accompanyPostId: string, content: string) =>
  await api.patch({
    url: `/comments/${accompanyPostId}`,
    data: { content },
  });

export const deleteComment = async (accompanyPostId: string) =>
  await api.delete({
    url: `/comments/${accompanyPostId}`,
  });

export const getReviews = async () =>
  await api.get({
    url: '/reviews?status=written',
  });

export const createReview = async (content: string) =>
  await api.post({
    url: '/reviews',
    data: { content },
  });

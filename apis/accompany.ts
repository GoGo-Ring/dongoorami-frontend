import { Companion, Profile } from '~/apis/scheme/accompany';
import { PerformanceInfo } from '~/apis/scheme/accompanyInput';
import { Comment } from '~/apis/scheme/comment';

import { AccompanyPost } from './scheme/accompanyDetail';

import api from '.';

// 동행 구인
export const createCompanion = async (companion: FormData) =>
  await api.post({
    url: '/accompanies/posts',
    data: companion,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getCompanions = async () => {
  const { data } = await api.get<Companion[]>({ url: '/accompanies/posts' });

  return data;
};

export const getCompanion = async (accompanyPostId: string) => {
  const { data } = await api.get<AccompanyPost>({
    url: `/accompanies/posts/${accompanyPostId}`,
  });

  return data;
};

export const deleteCompanion = async (accompanyPostId: string) =>
  await api.delete({ url: `/accompanies/posts/${accompanyPostId}` });

export const updateCompanion = async (
  accompanyPostId: string,
  companion: FormData,
) =>
  await api.post({
    url: `/accompanies/posts/${accompanyPostId}`,
    data: companion,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getCompanionProfile = async (memberId: number) => {
  const { data } = await api.get<Profile>({
    url: `/accompanies/profile/${memberId}`,
  });

  return data;
};
export const createAcompanyApplyComment = async (accompanyPostId: string) =>
  await api.post({
    url: `/accompanies/${accompanyPostId}`,
  });
export const createComment = async (accompanyPostId: string, content: string) =>
  await api.post({
    url: `/accompanies/comments/${accompanyPostId}`,
    data: { content },
  });

export const getComments = async (accompanyPostId: string) => {
  const { data } = await api.get<{ accompanyCommentInfos: Comment[] }>({
    url: `/accompanies/comments/${accompanyPostId}`,
  });

  return data;
};

export const updateComment = async (commentId: string, content: string) =>
  await api.patch({
    url: `/accompanies/comments/${commentId}`,
    data: { content },
  });

export const deleteComment = async (commentId: string) =>
  await api.delete({
    url: `/accompanies/comments/${commentId}`,
  });

export const confirmCompanion = async (commentId: string) =>
  await api.patch({
    url: `/accompanies/${commentId}`,
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

export const getPerformanceInfos = async (keyword: string) => {
  const { data } = await api.get<PerformanceInfo[]>({
    url: `/concerts/keywords?keyword=${keyword}`,
  });

  return data;
};

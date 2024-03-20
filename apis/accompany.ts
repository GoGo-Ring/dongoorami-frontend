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
export const createComment = async (
  accompanyPostId: string,
  userId: string,
  content: string,
) =>
  await api.post({
    url: `/comments/${accompanyPostId}`,
    data: { userId, content },
  });

export const getComments = async (accompanyPostId: string) => {
  const { data } = await api.get<Comment[]>({
    url: `/comments/${accompanyPostId}`,
  });

  return data;
};

export const updateComment = async (
  accompanyPostId: string,
  commentId: string,
  content: string,
) =>
  await api.patch({
    url: `/comments/${accompanyPostId}/${commentId}`,
    data: { content },
  });

export const deleteComment = async (
  accompanyPostId: string,
  commentId: string,
) =>
  await api.delete({
    url: `/comments/${accompanyPostId}/${commentId}`,
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

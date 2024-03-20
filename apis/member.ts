import { Member, Profile, RegisterMemberRequest, Token } from './scheme/member';

import api from '.';

export const getMember = async () => {
  const { data } = await api.get<Member>({ url: '/members' });

  return data;
};

export const getProfile = async (id: number) => {
  const { data } = await api.get<Profile>({
    url: `/accompanies/profile/${id}`,
  });

  return data;
};

export const updateMember = async (member: Partial<Member>) => {
  const { data } = await api.patch<Member>({ url: '/members', data: member });

  return data;
};

export const updateProfileImage = (data: FormData) => {
  return api.post<{ profileImageUrl: string }>({
    url: '/members/profile-image',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteMember = () => api.delete({ url: '/members' });

export const registerMember = async (member: RegisterMemberRequest) => {
  const { data } = await api.patch<Member>({
    url: '/members/signUp',
    data: member,
  });

  return data;
};

export const reAuthorize = async (token: Pick<Token, 'refreshToken'>) => {
  const { data } = await api.patch<Token>({
    url: '/members/reissue',
    data: token,
  });

  return data;
};

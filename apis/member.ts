import { Member } from './scheme/member';

import api from '.';

export const getMember = async () => {
  const { data } = await api.get<Member>({ url: '/members' });

  return data;
};

export const updateMember = async (member: Partial<Member>) => {
  const { data } = await api.patch<Member>({ url: '/members', data: member });

  return data;
};

export const deleteMember = () => api.delete({ url: '/members' });

export const registerMember = async (member: Partial<Member>) => {
  const registerData = {
    nickname: member.nickname,
    gender: member.gender,
    birthDate: member.birthdate,
  };

  const { data } = await api.patch<Member>({
    url: '/members/signUp',
    data: registerData,
  });

  return data;
};

export interface RegisterMemberRequest {
  nickname: string;
  gender: '남' | '여' | '무관';
  birthDate: string;
}

export interface Member {
  profileImage: string;
  name: string;
  nickname: string;
  gender: '남' | '여' | '무관';
  age: number;
  manner: number;
  introduction: string;
}

export interface Profile extends Member {
  currentMember: boolean;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

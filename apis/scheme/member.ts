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

export interface AccompanyPostShort {
  id: number;
  title: string;
  content: string;
  totalPeople: number;
  updatedAt: string;
}

export interface WrittenPostList {
  hasNext: boolean;
  accompanyPostShortResponses: AccompanyPostShort[];
}

export interface CommentResponse {
  accompanyCommentId: number;
  accompanyPostId: number;
  accompanyPostTitle: string;
  content: string;
  updatedAt: string;
}

export interface WrittenCommentList {
  hasNext: boolean;
  accompanyCommentShortResponses: CommentResponse[];
}

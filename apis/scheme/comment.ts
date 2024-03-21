export interface Comment {
  id: number;
  memberProfile: {
    id: number;
    nickname: string;
    profileImage: string;
    gender: '남자' | '여자';
    age: number;
    introduction: string;
    currentMember: boolean;
  };
  content: string;
  isAccompanyApplyComment: boolean;
  isAccompanyConfirmedComment: boolean;
  createdAt: string;
  updatedAt: string;
}

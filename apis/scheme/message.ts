export interface Message {
  id: number;
  partner: {
    id: number;
    nickname: string;
    profileImage: string;
    gender: '여자' | '남자';
    age: number;
    introduction: string;
    currentMember: boolean;
    manner: number;
  };
  content: string;
  createdAt: string;
  hasUnRead: boolean;
  myMessage: boolean;
}

export interface MessageWithPage {
  messageResponses: Message[];
  hasNext: boolean;
}

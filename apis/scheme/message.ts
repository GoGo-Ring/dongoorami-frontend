export interface Message {
  id: number;
  accompanyPostId: number;
  senderId: number;
  receiverId: number;
  content: string;
  date: string;
  isRead: boolean;
}

export type MessageWithPage = { messages: Message[]; allPage: number };

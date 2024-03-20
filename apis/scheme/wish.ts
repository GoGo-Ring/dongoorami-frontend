export interface Wish {
  wishId: number;
  accompanyPostId: number;
  title: string;
  content: string;
  totalPeople: number;
  updatedAt: string;
}

export interface WishResponse {
  hasNext: boolean;
  wishGetResponses: Wish[];
}

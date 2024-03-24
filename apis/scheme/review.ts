export interface AccompanyReviews {
  memberId: number;
  content: string;
  rating: number;
  ratingItemTypes: string[];
}

export interface UpdateAccompanyReviews {
  id: number;
  data: AccompanyReviews[];
}

export interface Review {
  id: number;
  nickname: string;
  title: string;
  content: string;
  rating: number;
  isWriter: boolean;
  updatedAt: string;
}

export interface ReviewResponse {
  hasNext: boolean;
  reviewResponses: Review[];
}

export interface SentReview {
  reviewId: number;
  content: string;
  targetId: number;
  title: string;
  updatedAt: string;
  isAccompanyReview: boolean;
}

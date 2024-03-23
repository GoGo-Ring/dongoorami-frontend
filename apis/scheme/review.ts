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

import accompanyDetail from './accompanyDetail';
import accompanyPerformances from './accompanyPerformances';
import accompanyReviews from './accompanyReview';
import comment from './comment';
import members from './members';
import message from './message';
import reviews from './review';

export const handlers = [
  ...members,
  ...message,
  ...comment,
  ...accompanyDetail,
  ...accompanyPerformances,
  ...reviews,
  ...accompanyReviews,
];

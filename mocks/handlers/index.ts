import accompanyDetail from './accompanyDetail';
import accompanyPerformances from './accompanyPerformances';
import comment from './comment';
import members from './members';
import message from './message';
import reviews from './review';
import wish from './wish';

export const handlers = [
  ...members,
  ...message,
  ...comment,
  ...accompanyDetail,
  ...accompanyPerformances,
  ...reviews,
  ...wish,
];
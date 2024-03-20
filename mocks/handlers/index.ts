import accompany from './accompany';
import accompanyDetail from './accompanyDetail';
import comment from './comment';
import members from './members';
import message from './message';
import reviews from './review';

export const handlers = [
  ...members,
  ...accompany,
  // ...performances,
  ...message,
  ...comment,
  ...accompanyDetail,
  ...reviews,
];

import accompany from './accompany';
import accompanyDetail from './accompanyDetail';
import accompanyPerformances from './accompanyPerformances';
import comment from './comment';
import members from './members';
import message from './message';
import performances from './performances';

export const handlers = [
  ...members,
  ...accompany,
  ...performances,
  ...message,
  ...comment,
  ...accompanyDetail,
  ...accompanyPerformances,
];

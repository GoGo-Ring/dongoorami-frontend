import accompanyDetail from './accompanyDetail';
import comment from './comment';
import members from './members';
import message from './message';
import performances from './performances';

export const handlers = [
  ...members,
  ...performances,
  ...message,
  ...comment,
  ...accompanyDetail,
];

import accompany from './accompany';
import comment from './comment';
import companions from './companion';
import members from './members';
import message from './message';
import performances from './performances';

export const handlers = [
  ...members,
  ...accompany,
  ...performances,
  ...companions,
  ...message,
  ...comment,
];

import accompany from './accompany';
import members from './members';
import message from './message';

export const handlers = [...members, ...accompany, ...message];

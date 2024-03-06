import accompany from './accompany';
import comment from './comment';
import members from './members';
import message from './message';

export const handlers = [...members, ...accompany, ...message, ...comment];
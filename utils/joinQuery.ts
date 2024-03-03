export const joinQuery = (...targets: string[][]) => {
  return targets.map(target => target.join('&'));
};

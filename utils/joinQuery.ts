export const joinQuery = (...targets: string[][]) => {
  return targets.map(target => target.join('&'));
};

export const getQuery = (options: Record<string, string[]>) => {
  return Object.entries(options)
    .map(([key, values]) => values.map(value => `${key}=${value}`).join('&'))
    .filter(value => value.length)
    .join('&');
};

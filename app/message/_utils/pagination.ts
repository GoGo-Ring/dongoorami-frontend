export const calculatePage = (page: number, edge: number) => {
  if (page < 1) {
    return 1;
  } else if (page > edge) {
    return edge;
  }

  return page;
};

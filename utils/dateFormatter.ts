export const getPerformanceStartDate = (performanceStartDate: Date) => {
  const year = performanceStartDate.getFullYear();
  const month = String(performanceStartDate.getMonth() + 1).padStart(2, '0');
  const day = String(performanceStartDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

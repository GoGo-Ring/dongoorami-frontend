type DateFormat = 'yyyy-mm-dd' | 'yyyy.mm.dd';

export const getDate = (date: Date, format: DateFormat) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (format) {
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    case 'yyyy.mm.dd':
      return `${year}.${month}.${day}`;
    default:
      return null;
  }
};

export const getAge = (date: Date) => {
  const today = new Date();
  const birthYear = date.getFullYear();
  const todayYear = today.getFullYear();

  return todayYear - birthYear + 1;
};

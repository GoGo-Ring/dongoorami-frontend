type DateFormat = 'yyyy-mm-dd' | 'yyyy.mm.dd';
type TimeFormat = 'hh:mm' | 'hh:mm:ss';

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

export const getTime = (date: Date, format: TimeFormat) => {
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  switch (format) {
    case 'hh:mm':
      return `${hour}:${minute}`;
    case 'hh:mm:ss':
      return `${hour}:${minute}:${second}`;
    default:
      return null;
  }
};

export const getDateWithTime = (
  date: Date,
  dateFormat: DateFormat,
  timeFormat: TimeFormat,
) => {
  const dateStr = getDate(date, dateFormat);
  const timeStr = getTime(date, timeFormat);

  return `${dateStr} ${timeStr}`;
};

export const getAge = (date: Date) => {
  const today = new Date();
  const birthYear = date.getFullYear();
  const todayYear = today.getFullYear();

  return todayYear - birthYear + 1;
};

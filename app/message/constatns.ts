export const MESSAGE_HEADER = {
  sender: '보낸 사람',
  content: '내용',
  date: '날짜',
  isRead: '읽음 상태',
};

export const getRead = (isRead: boolean) => {
  return isRead ? '읽음' : '안읽음';
};

export const MESSAGE_SIZE = 1;

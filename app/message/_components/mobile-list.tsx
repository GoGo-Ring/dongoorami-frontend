import useFetchMessage from '~/hooks/queries/useFetchMessage';
import { getDate } from '~/utils/dateFormatter';

import { getRead } from '../constatns';

const MobileMessage = () => {
  const { data } = useFetchMessage(6, 1);

  return (
    <ul className="flex flex-col gap-3 md:hidden lg:hidden">
      {data?.messages.map(message => (
        <li
          key={message.id}
          className="flex items-center justify-between gap-4 border-b px-2 pb-2"
        >
          <div className="flex flex-col">
            <h3>{message.senderId}</h3>
            <p className="text-gray-400">
              {getDate(new Date(message.date), 'yyyy.mm.dd')}
            </p>
            <p className="line-clamp-1 text-ellipsis">{message.content}</p>
          </div>
          <span className="text-nowrap">{getRead(message.isRead)}</span>
        </li>
      ))}
      <li className="flex items-center justify-between gap-4 border-b px-2 pb-2">
        <div className="flex flex-col">
          <h3>유저입니다.</h3>
          <p className="text-gray-400">{getDate(new Date(), 'yyyy.mm.dd')}</p>
          <span className="line-clamp-1 text-ellipsis">
            내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
          </span>
        </div>
        <span className="text-nowrap">{getRead(false)}</span>
      </li>
    </ul>
  );
};

export default MobileMessage;

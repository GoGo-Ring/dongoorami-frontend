import Link from 'next/link';

import useFetchMessage from '~/hooks/queries/useFetchMessage';
import { getDate } from '~/utils/dateFormatter';

import { getRead } from '../constatns';

const MobileMessage = () => {
  const { data } = useFetchMessage(6, 1);

  return (
    <ul className="flex flex-col gap-3 md:hidden lg:hidden">
      {data?.messageResponses.map(message => (
        <li key={message.id}>
          <Link
            className="flex items-center justify-between gap-4 border-b px-2 pb-2"
            href={{
              pathname: '/message/write',
              query: { userId: message.partner.id },
            }}
          >
            <div className="flex flex-col">
              <h3>{message.partner.id}</h3>
              <p className="text-gray-400">
                {getDate(new Date(message.createdAt), 'yyyy.mm.dd')}
              </p>
              <p className="line-clamp-1 text-ellipsis">{message.content}</p>
            </div>
            <span className="text-nowrap">{getRead(!message.hasUnRead)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MobileMessage;

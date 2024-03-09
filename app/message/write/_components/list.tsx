import useFetchMessageById from '~/hooks/queries/useFetchMessageById';
import { cn } from '~/libs/utils';
import { getDateWithTime } from '~/utils/dateFormatter';

interface MessageWriteListProps {
  targetId: number;
}

const MessageWriteList = ({ targetId }: MessageWriteListProps) => {
  const { data } = useFetchMessageById(targetId, 100, 1);
  const myId = 2; // TODO: 유저 로직 추가
  const isMyId = (id: number) => id === myId;

  return (
    <div className="divide-y">
      {data?.messages?.map(({ id, content, date, senderId }) => (
        <div
          key={id}
          className={cn(
            'text-bold flex flex-col p-2 text-sm ',
            isMyId(senderId) ? ' bg-gray-150 ' : '',
          )}
        >
          <p className="text-gray-700">
            {`유저 ${senderId} ${isMyId(senderId) ? '(나)' : ''}`}
          </p>
          <p className="line-clamp-4 whitespace-pre-wrap text-wrap text-gray-600 hover:block hover:overflow-visible">
            {content}
          </p>
          <div className="flex gap-4 self-end text-sm ">
            <p className="text-gray-300">
              {getDateWithTime(new Date(date), 'yyyy.mm.dd', 'hh:mm:ss')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageWriteList;

import Profile from '~/app/recruitment/[id]/_components/profile';
import useFetchMessageById from '~/hooks/queries/useFetchMessageById';
import { cn } from '~/libs/utils';
import { getDateWithTime } from '~/utils/dateFormatter';

interface MessageWriteListProps {
  myProfileImage: string;
  myName: string;
  contacterId: number;
  contacterName: string;
  contacterProfileImage: string;
}

const MessageWriteList = ({
  myProfileImage,
  myName,
  contacterId,
  contacterName,
  contacterProfileImage,
}: MessageWriteListProps) => {
  const { data } = useFetchMessageById(contacterId, 100, 1);
  const isMyId = (id: number) => id === 1; // TODO: 로그인 정보로 변경

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
          <Profile
            name={isMyId(senderId) ? myName : contacterName}
            image={isMyId(senderId) ? myProfileImage : contacterProfileImage}
          />
          <p className="line-clamp-2 break-words hover:block hover:overflow-visible">
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

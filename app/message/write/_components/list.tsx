import Profile from '~/app/recruitment/[id]/_components/profile';
import useInfiniteSendingMessagesById from '~/hooks/infinite/useInfiniteMessagesById';
import useIntersectionObsever from '~/hooks/useIntersectionObserver';
import { cn } from '~/libs/utils';
import { getDateWithTime } from '~/utils/dateFormatter';

interface MessageWriteListProps {
  myProfileImage: string;
  myName: string;
  contacterId: number;
  contacterName: string;
  contacterProfileImage: string;
  isInifinity: boolean;
}

const SIZE = 6;

const MessageWriteList = ({
  myProfileImage,
  myName,
  contacterId,
  contacterName,
  contacterProfileImage,
  isInifinity,
}: MessageWriteListProps) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteSendingMessagesById({
    partnerId: contacterId,
    size: SIZE,
  });

  const handleFetchNextPage = () => {
    fetchNextPage();
  };
  const ref = useIntersectionObsever<HTMLDivElement>({
    callback: handleFetchNextPage,
    condition: hasNextPage,
  });

  return (
    <div className="divide-y">
      {data?.map(({ id, content, createdAt, myMessage }) => (
        <div
          key={id}
          className={cn(
            'text-bold flex flex-col p-2 text-sm ',
            myMessage ? ' bg-gray-150 ' : '',
          )}
        >
          <Profile
            name={myMessage ? myName : contacterName}
            image={myMessage ? myProfileImage : contacterProfileImage}
          />
          <p className="break-words p-4">{content}</p>
          <div className="flex gap-4 self-end text-sm ">
            <p className="text-gray-300">
              {getDateWithTime(new Date(createdAt), 'yyyy.mm.dd', 'hh:mm:ss')}
            </p>
          </div>
        </div>
      ))}
      {isInifinity && <div ref={ref} className="invisible" />}
    </div>
  );
};

export default MessageWriteList;

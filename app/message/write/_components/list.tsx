import useFetchMessageById from '~/hooks/queries/useFetchMessageById';

interface MessageWriteListProps {
  targetId: number;
}

const MessageWriteList = ({ targetId }: MessageWriteListProps) => {
  const { data } = useFetchMessageById(targetId, 100, 1);

  return (
    <div>
      {data?.messages?.map(({ id, content, date, senderId }) => (
        <div key={id} className="flex flex-col border-b-2 p-2">
          <p className="text-gray-600">{content}</p>
          <div className="flex gap-4 self-end text-sm ">
            <p className="text-gray-300">{date}</p>
            <p className="text-gray-700">유저 {senderId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageWriteList;

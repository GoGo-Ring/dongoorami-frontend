import Icon from '~/components/icon';
import { getDate } from '~/utils/dateFormatter';

interface PostMetaProps {
  updatedAt: string;
  waitingCount: number;
  viewCount: number;
}

const PostStatus = ({ updatedAt, waitingCount, viewCount }: PostMetaProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <p className="text-base font-medium text-gray-400">
        {getDate(new Date(updatedAt || ''), 'yyyy.mm.dd')}
      </p>
      <Icon iconName="chat" size="small" className=" fill-gray-400" />
      <p className="text-base font-medium text-gray-400">{waitingCount}</p>
      <Icon iconName="eye" size="small" className=" fill-gray-400" />
      <p className="text-base font-medium text-gray-400">{viewCount}</p>
      <Icon iconName="heart" size="small" className=" fill-gray-400" />
    </div>
  );
};

export default PostStatus;

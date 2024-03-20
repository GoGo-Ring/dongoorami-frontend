import { Badge } from '~/components/badge';
import Icon from '~/components/icon';
import { getDate } from '~/utils/dateFormatter';

interface PostMetaProps {
  status: '모집 중' | '모집 완료';
  createdAt: string;
  waitingCount: number;
  viewCount: number;
}

const PostStatus = ({
  status,
  createdAt,
  waitingCount,
  viewCount,
}: PostMetaProps) => {
  const formattedDate = getDate(new Date(createdAt || ''), 'yyyy.mm.dd');

  return (
    <div className="flex items-center gap-1.5">
      <Badge className=" rounded-md">{status}</Badge>
      <p className="text-base font-medium text-gray-400">{formattedDate}</p>
      <Icon iconName="chat" size="small" className=" fill-gray-400" />
      <p className="text-base font-medium text-gray-400">{waitingCount}</p>
      <Icon iconName="eye" size="small" className=" fill-gray-400" />
      <p className="text-base font-medium text-gray-400">{viewCount}</p>
      <Icon iconName="heart" size="small" className=" fill-gray-400" />
    </div>
  );
};

export default PostStatus;

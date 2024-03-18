import { PropsWithChildren } from 'react';

import Profile from '~/app/recruitment/[id]/_components/profile';
import { getDateWithTime } from '~/utils/dateFormatter';

interface CommentContentProps {
  nickName: string;
  profileImage: string;
  updatedAt: string;
  content?: string;
}

const CommentContent = ({
  nickName,
  profileImage,
  updatedAt,
  content = '',
  children,
}: PropsWithChildren<CommentContentProps>) => {
  return (
    <>
      <div className="flex justify-between">
        <Profile name={nickName} image={profileImage} />
        <p className="text-sm font-medium text-gray-400">
          {children}
          {getDateWithTime(new Date(updatedAt), 'yyyy.mm.dd', 'hh:mm')}
        </p>
      </div>
      <p className="text-md font-medium">{content}</p>
    </>
  );
};

export default CommentContent;

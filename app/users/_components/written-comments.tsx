import Link from 'next/link';

import { CommentResponse } from '~/apis/scheme/member';
import useFetchWrittenComments from '~/hooks/queries/useFetchWrittenComments';
import { getDate } from '~/utils/dateFormatter';

interface WrittenCommentsProps {
  id?: number;
}

const WrittenComments = ({ id }: WrittenCommentsProps) => {
  const { data: comments } = useFetchWrittenComments();

  if (!comments.length) {
    return (
      <div
        key={id}
        className="flex flex-col rounded-md border border-border px-2 py-1.5"
      >
        <h3>작성한 댓글이 없습니다.</h3>
      </div>
    );
  }

  return (
    <ul>
      {comments.map(
        ({
          accompanyPostId,
          accompanyPostTitle,
          content,
          updatedAt,
        }: CommentResponse) => (
          <li key={accompanyPostId}>
            <Link
              href={{
                pathname: '/recruitment',
                query: { id: accompanyPostId },
              }}
              className="flex flex-col rounded-md border border-border px-2 py-1.5"
            >
              <h3>{accompanyPostTitle}</h3>
              <span className="text-gray-500">{content}</span>

              <time className="mt-5 items-end justify-self-end text-sm text-gray-300">
                {getDate(new Date(updatedAt), 'yyyy.mm.dd')}
              </time>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default WrittenComments;

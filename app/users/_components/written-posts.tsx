import Link from 'next/link';

import { AccompanyPostShort } from '~/apis/scheme/member';
import useFetchWrittenPosts from '~/hooks/queries/useFetchWrittenPosts';
import { getDate } from '~/utils/dateFormatter';

const WrittenPosts = () => {
  const { data: posts } = useFetchWrittenPosts();

  if (!posts.length) {
    return (
      <div className="flex flex-col rounded-md border border-border px-2 py-1.5">
        <h3>작성한 게시물이 없습니다.</h3>
      </div>
    );
  }

  return (
    <ul>
      {posts.map(
        ({
          id,
          title,
          content,
          totalPeople,
          updatedAt,
        }: AccompanyPostShort) => (
          <li key={id}>
            <Link
              href={{ pathname: '/recruitment', query: { id } }}
              className="flex flex-col rounded-md border border-border px-2 py-1.5"
            >
              <h3>{title}</h3>
              <span className="text-gray-500">{content}</span>
              {totalPeople && (
                <span className="text-gray-500">{totalPeople}명 참여</span>
              )}

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

export default WrittenPosts;

import Link from 'next/link';

import useFetchSentReview from '~/hooks/queries/useFetchSentReview';
import useFetchUnsentReview from '~/hooks/queries/useFetchUnsentReviews';
import { getDate } from '~/utils/dateFormatter';

interface SentReviewProps {
  id?: number;
}

const SentReview = ({ id }: SentReviewProps) => {
  const { data: reviews } = useFetchSentReview(id);
  const { data: unsentReviews } = useFetchUnsentReview(id);

  if (!unsentReviews?.length && !reviews?.length) {
    return (
      <div className="flex flex-col rounded-md border border-border px-2 py-1.5">
        <h3>작성한 후기가 없습니다.</h3>
      </div>
    );
  }

  return (
    <ul>
      {unsentReviews?.map(
        ({ reviewId, title, content, targetId, updatedAt }) => (
          <li key={reviewId}>
            <Link
              href={{ pathname: '/message/write', query: { userId: targetId } }}
              className="flex flex-col rounded-md border border-border px-2 py-1.5"
            >
              <h3>
                {content}{' '}
                <span className="text-sm text-gray-400">- 미작성</span>
              </h3>
              <span className="text-gray-500">{title}</span>

              <time className="mt-5 items-end justify-self-end text-sm text-gray-300">
                {getDate(new Date(updatedAt), 'yyyy.mm.dd')}
              </time>
            </Link>
          </li>
        ),
      )}
      {reviews?.map(({ reviewId, title, content, updatedAt }) => (
        <li key={reviewId}>
          <h3>{content}</h3>
          <span className="text-gray-500">{title}</span>

          <time className="mt-5 items-end justify-self-end text-sm text-gray-300">
            {getDate(new Date(updatedAt), 'yyyy.mm.dd')}
          </time>
        </li>
      ))}
    </ul>
  );
};

export default SentReview;

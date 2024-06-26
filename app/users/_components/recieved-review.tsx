import useFetchReviews from '~/hooks/queries/useFetchReviews';
import { getDate } from '~/utils/dateFormatter';

interface RecievedReviewProps {
  id?: number;
}

const RecievedReview = ({ id }: RecievedReviewProps) => {
  const { data: reviews } = useFetchReviews(id);

  if (!reviews.length) {
    return (
      <div
        key={id}
        className="flex flex-col rounded-md border border-border px-2 py-1.5"
      >
        <h3>받은 후기가 없습니다.</h3>
      </div>
    );
  }

  return (
    <ul>
      {reviews.map(({ id: reviewId, title, content, updatedAt }) => (
        <li
          key={reviewId}
          className="flex flex-col rounded-md border border-border px-2 py-1.5"
        >
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

export default RecievedReview;

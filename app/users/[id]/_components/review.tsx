import { getDate } from '~/utils/dateFormatter';

interface ReviewProps {
  content: string;
  user: string;
  date: string;
}

const Review = ({ user, content, date }: ReviewProps) => {
  return (
    <div className="flex flex-col rounded-md border border-border px-2 py-1.5">
      <h3>{content}</h3>
      <span className="text-gray-500">{user}</span>
      <time className="mt-5 items-end justify-self-end text-sm text-gray-300">
        {getDate(new Date(date), 'yyyy.mm.dd')}
      </time>
    </div>
  );
};

export default Review;

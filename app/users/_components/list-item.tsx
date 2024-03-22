import { getDate } from '~/utils/dateFormatter';

interface ReviewProps {
  content: string;
  title: string;
  date: string;
  totalPeople?: number;
}

const Review = ({ title, content, date, totalPeople }: ReviewProps) => {
  return (
    <li className="flex flex-col rounded-md border border-border px-2 py-1.5">
      <h3>{content}</h3>
      <span className="text-gray-500">{title}</span>
      {totalPeople && (
        <span className="text-gray-500">{totalPeople}명 참여</span>
      )}

      <time className="mt-5 items-end justify-self-end text-sm text-gray-300">
        {getDate(new Date(date), 'yyyy.mm.dd')}
      </time>
    </li>
  );
};

export default Review;

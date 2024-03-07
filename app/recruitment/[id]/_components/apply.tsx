import { useRouter } from 'next/navigation';

import Field from '~/app/recruitment/[id]/_components/field';
import { Button } from '~/components/button';

interface AccompanyApplyProps {
  count: number;
  userId: number;
}

const AccompanyApply = ({ count, userId }: AccompanyApplyProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full">
      <div className="flex w-1/2 gap-8">
        <Field label="신청 대기자" value={count} />
      </div>
      <div className="w-1/2">
        <Button
          className="px-8"
          onClick={() => router.push(`/message/write?userId=${userId}`)}
        >
          동행 신청
        </Button>
      </div>
    </div>
  );
};

export default AccompanyApply;

import { Button } from '~/components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/collapsible';
import { Textarea } from '~/components/textarea';

interface ReviewFormProps {
  username: string;
}
const ReviewForm = ({ username }: ReviewFormProps) => {
  return (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <span className="text-sm font-semibold">{username}</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <Textarea placeholder="동행자, 동행 상황에 대한 솔직한 리뷰를 남겨주세요." />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ReviewForm;

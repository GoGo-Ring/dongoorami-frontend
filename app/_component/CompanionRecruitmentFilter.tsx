import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

const CompanionRecruitmentFilter = () => {
  return (
    <div>
      <span className="font-semibold">성별</span>
      <RadioGroup defaultValue="무관">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="무관" id="무관" />
          <Label htmlFor="무관">무관</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="남자" id="남자" />
          <Label htmlFor="남자">남자</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="여자" id="여자" />
          <Label htmlFor="여자">여자</Label>
        </div>
      </RadioGroup>
      <div className="flex flex-col">
        <span className="font-semibold">나이</span>
        <div className="flex flex-row gap-1">
          <Input type="number" className="w-16" />
          <span className="my-auto ">~</span>
          <Input type="number" className="w-16" />
        </div>
      </div>
    </div>
  );
};

export default CompanionRecruitmentFilter;

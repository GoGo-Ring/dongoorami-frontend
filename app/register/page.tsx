import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

const Register = () => {
  const LabelStyle = 'w-24 text-nowrap text-base font-semibold p-1';
  const InputContainerStyle = 'flex flex-col rounded-md p-2';

  return (
    <div className=" flex h-full w-full items-center justify-center p-8">
      <div className="flex-column relative h-[800px] w-96 min-w-96 space-y-3 rounded-md border  border border-primary bg-muted p-1">
        <h1 className="p-6 text-center text-3xl  font-semibold">회원가입</h1>
        <div className={InputContainerStyle}>
          <Label className={LabelStyle}>닉네임</Label>
          <Input type="text" placeholder="닉네임을 입력해주세요"></Input>
        </div>
        <div className={InputContainerStyle}>
          <Label className={LabelStyle}>성별</Label>
          <RadioGroup className="flex w-full p-2" id="gender">
            <RadioGroupItem value="male" id="male" />
            <Label>남</Label>
            <RadioGroupItem value="female" id="female" />
            <Label>여</Label>
          </RadioGroup>
        </div>
        <div className={InputContainerStyle}>
          <Label className={LabelStyle}>생년월일</Label>
          <div className="flex gap-8">
            <Input type="text" placeholder="연도" />
            <Input type="text" placeholder="월" />
            <Input type="text" placeholder="일" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex gap-8 px-4 py-8">
          <Button className="w-full border border-primary bg-secondary text-secondary-foreground hover:bg-destructive">
            홈으로
          </Button>
          <Button className="w-full bg-primary text-primary-foreground">
            가입하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;

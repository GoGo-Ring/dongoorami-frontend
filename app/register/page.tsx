'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { registerMember } from '~/apis/member';
import { Member } from '~/apis/scheme/member';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';

import validate, { FormValues } from './validation';

const Register = () => {
  const router = useRouter();
  const LabelStyle = 'w-24 text-nowrap text-base font-semibold p-1';
  const InputContainerStyle = 'h-[100px] flex flex-col rounded-md px-2 ';
  const ErrorStyle = 'px-1 mt-2 text-red-500 text-sm';

  const [values, setValues] = useState<FormValues>({} as FormValues);

  const [errors, setErrors] = useState({
    nickname: '',
    gender: '',
    birthdate: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };
  const handleGenderChange = (value: 'male' | 'female') => {
    setValues({ ...values, gender: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validate(values);

    setErrors(errors);

    if (Object.values(errors).some(value => value)) {
      return;
    }

    const data: Partial<Member> = {
      nickname: values.nickname,
      gender: values.gender === 'male' ? '남' : '여',
      birthdate: `${values.year}${values.month}${values.day}`,
    };

    registerMember(data);
  };

  return (
    <div className=" flex h-full w-full items-center justify-center p-8">
      <form onSubmit={handleSubmit}>
        <div className="flex-column relative h-[800px] w-96 min-w-96 space-y-1 rounded-md border  border border-primary bg-muted p-1">
          <h1 className="p-6 text-center text-3xl  font-semibold">회원가입</h1>
          <div className={InputContainerStyle}>
            <Label className={LabelStyle}>닉네임</Label>
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              id="nickname"
              onChange={handleChange}
            />
            {errors.nickname && (
              <span className={ErrorStyle}>{errors.nickname}</span>
            )}
          </div>
          <div className={InputContainerStyle}>
            <Label className={LabelStyle}>성별</Label>
            <RadioGroup
              className="flex w-full p-2"
              id="gender"
              onValueChange={handleGenderChange}
            >
              <RadioGroupItem value="male" />
              <Label>남</Label>
              <RadioGroupItem value="female" />
              <Label>여</Label>
            </RadioGroup>
            {errors.gender && (
              <span className={ErrorStyle}>{errors.gender}</span>
            )}
          </div>

          <div className={InputContainerStyle}>
            <Label className={LabelStyle}>생년월일</Label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="YYYY"
                id="year"
                onChange={handleChange}
              />
              년
              <Input
                type="text"
                placeholder="MM"
                id="month"
                onChange={handleChange}
              />
              월
              <Input
                type="text"
                placeholder="DD"
                id="day"
                onChange={handleChange}
              />
              일
            </div>
            {errors.birthdate && (
              <span className={ErrorStyle}>{errors.birthdate}</span>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex gap-8 px-4 py-8">
            <Button
              type="button"
              className="w-full border border-primary bg-secondary text-secondary-foreground hover:bg-destructive"
              onClick={() => router.push('/')}
            >
              홈으로
            </Button>
            <Button
              className="w-full bg-primary text-primary-foreground"
              type="submit"
            >
              가입하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

'use client';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { createCompanion } from '~/apis/accompany';
import { companionFormValueToRequest } from '~/app/recruitment/new/utils';
import { Button } from '~/components/button';
import Spinner from '~/components/spinner';
import useFetchCompanionPost from '~/hooks/queries/useFetchCompanionPost';

import {
  ImageField,
  InputField,
  RadioGroupField,
  RadioGroupFieldItem,
  SelectField,
  SelectFieldItem,
  SliderField,
  TextareaField,
  CalendarField,
} from './_components/fields';
import { Form } from './_components/form';
import {
  CompanionFormValue,
  FORM_ITEMS,
  INITIAL_VALUES,
  VALIDATIONS,
} from './constants';

const Page = () => {
  const { mutate, isPending } = useMutation({ mutationFn: createCompanion });
  const postId = useSearchParams().get('id');
  const isEdit = !!postId;

  const { refetch } = useFetchCompanionPost(postId || '');

  useEffect(() => {
    if (isEdit) {
      refetch();
    }
  }, [isEdit, refetch]);

  const handleSubmit = (values: CompanionFormValue) => {
    const companionData = companionFormValueToRequest(values);

    mutate(companionData as unknown as FormData);
  };

  return (
    <div className="flex justify-center py-10">
      <Form
        className="flex w-[890px] flex-col justify-center gap-4"
        initialValues={INITIAL_VALUES}
        initialValidations={VALIDATIONS}
        submit={handleSubmit}
      >
        <div className="px-4">
          <InputField
            id="title"
            label="제목"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="px-4">
          <ImageField id="images" label="이미지" />
        </div>
        <div className="mx-4 flex items-start gap-7 rounded-md border border-gray-200 px-6 pt-6 sm:mx-0 sm:flex-wrap sm:border-0 md:flex-wrap">
          <div className="flex w-full flex-col">
            <InputField
              id="performanceId"
              label="공연명"
              placeholder="공연명을 입력해주세요"
            />
            <SelectField id="region" label="지역" placeholder="선택">
              <SelectFieldItem items={FORM_ITEMS.REGIONS} />
            </SelectField>
            <SelectField
              id="participantCount"
              label="인원수"
              placeholder="선택"
            >
              <SelectFieldItem items={FORM_ITEMS.PARTICIPANT_COUNT} />
            </SelectField>
            <CalendarField
              id="performanceDate"
              minId="performanceMinDate"
              maxId="performanceMaxDate"
              label="공연 날짜"
            />
          </div>
          <div className="flex w-full flex-col ">
            <SliderField id="age" minId="minAge" maxId="maxAge" label="연령" />
            <RadioGroupField id="gender" label="성별">
              {FORM_ITEMS.GENDER.map(({ label, id }) => (
                <RadioGroupFieldItem key={id} id={id} label={label} />
              ))}
            </RadioGroupField>
          </div>
        </div>
        <div className="px-4">
          <TextareaField
            id="content"
            label="내용"
            labelClassName="hidden"
            placeholder="내용을 입력해주세요"
          />
        </div>
        <div className="flex gap-8 px-4">
          <Button className="w-full bg-secondary text-secondary-foreground">
            취소
          </Button>
          <Button
            className="w-full bg-primary text-primary-foreground"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : isEdit && '수정'}
            {isPending ? <Spinner /> : !isEdit && '등록'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Page;

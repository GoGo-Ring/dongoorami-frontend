'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import Error from '~/app/recruitment/new/error';
import Loading from '~/app/recruitment/new/loading';
import {
  companionDetailToFormValue,
  companionFormValueToRequest,
  convertURLtoFile,
} from '~/app/recruitment/new/utils';
import { Button } from '~/components/button';
import Spinner from '~/components/spinner';
import useMutationCreateCompanyPost from '~/hooks/mutations/useMutationCreateCompanyPost';
import useMutationUpdateCompanyPost from '~/hooks/mutations/useMutationUpdateCompanyPost';
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
  SearchButtonField,
  CheckBoxField,
} from './_components/fields';
import { Form } from './_components/form';
import {
  CompanionFormValue,
  FORM_ITEMS,
  INITIAL_VALUES,
  VALIDATIONS,
} from './constants';

const Page = () => {
  const router = useRouter();

  const postId = useSearchParams().get('id');
  const {
    mutate: createPost,
    isPending,
    isError: isMutateError,
    error: mutateError,
  } = useMutationCreateCompanyPost(postId || '');
  const { mutate: updatePost } = useMutationUpdateCompanyPost(postId || '');
  const isEdit = !!postId;

  const {
    data: postData,
    refetch,
    isFetching,
    isError: isFetchError,
    error: fetchError,
  } = useFetchCompanionPost(postId || '');

  useEffect(() => {
    if (isEdit) {
      refetch();
    }
  }, [isEdit, refetch]);

  if (isMutateError) {
    return (
      <Error
        error={mutateError}
        reset={() => {
          if (isEdit) {
            refetch();
          }
        }}
      />
    );
  }

  if (isEdit && isFetchError) {
    return (
      <Error
        error={fetchError}
        reset={() => {
          refetch();
        }}
      />
    );
  }

  if ((isEdit && isFetching) || isPending) {
    return <Loading />;
  }

  const handleSubmit = async (values: CompanionFormValue) => {
    const companionData = companionFormValueToRequest(values);
    const imageUrls = values.images;
    const formData = new FormData();

    formData.append(
      'accompanyPostRequest',
      new Blob([JSON.stringify(companionData)], {
        type: 'application/json',
      }),
    );

    await Promise.all(
      imageUrls.map((url, index) => convertURLtoFile(String(index), url)),
    ).then(files => {
      files.forEach(file => {
        formData.append('images', file);
      });
    });

    if (imageUrls.length === 0) {
      formData.append('images', new File([], ''));
    }

    if (isEdit) {
      updatePost(
        { accompanyPostId: postId, formData },
        {
          onSuccess: () => {
            router.push(`/recruitment/${postId}`);
          },
        },
      );
    } else {
      createPost(formData, {
        onSuccess: ({ headers }) => {
          router.push(
            `/recruitment/${headers.location.split('accompanies/posts/')[1]}`,
          );
        },
      });
    }
  };

  return (
    <div className="flex justify-center py-10">
      <Form
        className="flex w-full flex-col justify-center gap-4"
        initialValues={
          isEdit
            ? companionDetailToFormValue({
                datas: postData,
                INITIAL_VALUES,
              })
            : INITIAL_VALUES
        }
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
          <div className="flex w-full flex-col lg:w-1/2">
            <SearchButtonField
              id="performanceId"
              valueId="performanceName"
              label="공연"
              placeholder="공연을 입력해주세요"
              listCount={10}
            />
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
            <CheckBoxField
              id="purposes"
              label="목적"
              items={FORM_ITEMS.PURPOSES}
            />
          </div>
          <div className="flex w-full flex-col lg:w-1/2 ">
            <SelectField id="region" label="지역" placeholder="선택">
              <SelectFieldItem items={FORM_ITEMS.REGIONS} />
            </SelectField>
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
          <Button
            className="w-full bg-secondary text-secondary-foreground"
            type="button"
            onClick={() => router.back()}
          >
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

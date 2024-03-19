import Image from 'next/image';
import React, { useContext } from 'react';

import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import { Badge } from '~/components/badge';
import { Button } from '~/components/button';
import ErrorText from '~/components/error-text';
import Icon from '~/components/icon';
import { UseFormReturn } from '~/hooks/useForm/types';

interface ImagePreviewProps {
  index: number;
  url: string;
  handleRemoveImage: (index: number) => void;
}

const ImagePreview = ({ url, index, handleRemoveImage }: ImagePreviewProps) => {
  return (
    <li key={index} className="flex flex-col">
      <Badge
        onClick={() => handleRemoveImage(index)}
        className="mt-4 size-6 cursor-pointer justify-center self-end rounded-full p-0 text-gray-600"
        variant="secondary"
      >
        <Icon iconName="remove" size={12} />
      </Badge>
      <Image
        key={index}
        src={url}
        alt=""
        width={300}
        height={200}
        className="h-20 w-20 rounded-md p-2"
      />
    </li>
  );
};

interface ImageFieldProps<K extends string> extends FieldProps {
  id: K;
}

export const ImageField = <
  K extends GetKeysValueOf<CompanionFormValue, string[]>,
>({
  id,
  placeholder,
  label,
  variant,
}: ImageFieldProps<K>) => {
  const { handleValueChange, errors, values } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    const fileUrls = [...(files || [])].map(file => {
      return URL.createObjectURL(file);
    });

    handleValueChange(id)([...values[id], ...fileUrls]);
  };

  const handleImageButtonClick = () => {
    const input = document.getElementById(id) as HTMLInputElement;

    input.click();
  };

  const handleRemoveImage = (index: number) => {
    const newImages = values[id].filter((_, i) => i !== index);

    handleValueChange(id)(newImages);
  };

  return (
    <Field id={id} label={label} variant={variant}>
      <input
        id={id}
        className="hidden"
        type="file"
        placeholder={placeholder}
        onChange={handleImageChange}
        name="images"
        multiple
      />
      <Button onClick={handleImageButtonClick} type="button" variant="outline">
        추가
      </Button>
      <ul className="flex flex-wrap gap-8">
        {values[id]?.map((url, index) => (
          <ImagePreview
            key={index}
            index={index}
            url={url}
            handleRemoveImage={handleRemoveImage}
          />
        ))}
      </ul>
      <ErrorText message={errors[id]} />
    </Field>
  );
};

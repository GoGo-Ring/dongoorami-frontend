import { useContext, useState } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { GetKeysValueOf } from '~/app/recruitment/new/utils';
import { Input } from '~/components/input';
import { UseFormReturn } from '~/hooks/useForm/types';

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
  const { handleChange, errors } =
    useContext<UseFormReturn<CompanionFormValue, K>>(FormContext);
  const [selectedImage, setSelectedImage] = useState<string | null>('');

  const encodeFileToBase64 = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = event => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    encodeFileToBase64(file as File);
    handleChange(event);
  };

  return (
    <Field id={id} label={label} variant={variant}>
      <Input
        id={id}
        className="cursor-pointer"
        type="file"
        placeholder={placeholder}
        onChange={handleImageChange}
      />
      {selectedImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={selectedImage}
          alt="이미지"
          width={300}
          height={200}
          className="self-center p-4"
        />
      )}
      <Error error={errors[id]} />
    </Field>
  );
};

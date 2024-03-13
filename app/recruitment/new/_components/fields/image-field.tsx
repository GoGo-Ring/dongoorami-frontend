import { useContext, useState } from 'react';

import { Error } from '~/app/recruitment/new/_components/error';
import {
  Field,
  FieldProps,
} from '~/app/recruitment/new/_components/fields/field';
import { FormContext } from '~/app/recruitment/new/_components/form';
import { Input } from '~/components/input';

export const ImageField = ({ id, placeholder, label, variant }: FieldProps) => {
  const { values, handleChange, errors } = useContext(FormContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(values[id]);

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

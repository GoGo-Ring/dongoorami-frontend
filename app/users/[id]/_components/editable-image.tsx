import Image from 'next/image';

import Upload from '~/components/image-uploader';
import useMutationProfileImage from '~/hooks/mutations/useMutationProfileImage';

interface EditableImageProps {
  profileImage: string;
  nickname: string;
}

const EditableImage = ({ nickname, profileImage }: EditableImageProps) => {
  const { mutate: mutateProfileImage } = useMutationProfileImage();
  const onSubmitProfileImage = (file: File | undefined) => {
    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append('image', file);
    mutateProfileImage(formData);
  };

  return (
    <Upload onChange={file => onSubmitProfileImage(file)} className="relative">
      <div className="group absolute flex h-36 w-36 items-center justify-center rounded-full bg-gray-800/0 duration-150 hover:bg-gray-800/80">
        <div className="rounded-sm border border-border px-2 py-1.5 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          이미지 변경
        </div>
      </div>
      <Image
        src={profileImage || ''}
        alt={`${nickname} user image`}
        width={144}
        height={144}
        priority={true}
        className="group h-36 w-36 rounded-full border border-border object-cover"
      />
    </Upload>
  );
};

export default EditableImage;

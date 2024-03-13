import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useRef,
  useState,
} from 'react';

interface UploadProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'onChange'> {
  id?: string;
  name?: string;
  access?: string;
  onChange?: (file?: File) => void;
  children?: ((src: string, file?: File) => ReactNode) | ReactNode;
}

const Upload = forwardRef<HTMLDivElement, UploadProps>(
  ({ id, name, access = 'image/*', onChange, children }: UploadProps, ref) => {
    const [file, setFile] = useState<File>();
    const [src, setSrc] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const encodeFileToBase64 = (file: File) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSrc(reader.result as string);
      };
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newFile = e.target.files?.item(0);

      if (!newFile) {
        return;
      }

      setFile(newFile);
      onChange?.(newFile);
      encodeFileToBase64(newFile);

      if (!inputRef.current) {
        return;
      }

      inputRef.current.value = '';
    };

    const handleFileClick = () => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.click();
    };

    return (
      <div
        className="inline-block"
        onClick={handleFileClick}
        ref={ref}
        role="presentation"
      >
        <input
          id={id}
          name={name}
          type="file"
          accept={access}
          ref={inputRef}
          onChange={handleFileChange}
          hidden
        />
        {typeof children === 'function' ? children(src, file) : children}
      </div>
    );
  },
);

Upload.displayName = 'Upload';

export default Upload;

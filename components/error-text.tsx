import { cn } from '~/libs/utils';

interface ErrorTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message: string;
}

const ErrorText = ({ message, className }: ErrorTextProps) => {
  return (
    <p className={cn('p-1 text-xs', 'text-destructive', className)}>
      {message || <>&nbsp;</>}
    </p>
  );
};

export default ErrorText;

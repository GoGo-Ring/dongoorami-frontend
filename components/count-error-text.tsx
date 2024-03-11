import ErrorText from '~/components/error-text';
import { cn } from '~/libs/utils';

interface CountErrorTextProps {
  limit: number;
  count: number;
}

const CountErrorText = ({ limit, count }: CountErrorTextProps) => (
  <ErrorText
    message={`${count} / ${limit}`}
    className={cn(count === 0 || count > limit ? '' : 'text-gray-700')}
  />
);

export default CountErrorText;

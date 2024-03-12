import { cn } from '~/libs/utils';
import { PropsWithRequiredChildren } from '~/types/utils';

interface InfoProps extends PropsWithRequiredChildren {
  label: string;
  className?: string;
}

const Info = ({ label, className, children }: InfoProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[80px,auto] items-center gap-md',
        className,
      )}
    >
      <span className="shrink-0">{label}</span>
      {children}
    </div>
  );
};

export default Info;

import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '~/libs/utils';

const labelVariants = cva('', {
  variants: {
    weight: {
      default: '',
      semibold: 'text-xl font-semibold',
    },
  },
  defaultVariants: { weight: 'default' },
});

const contentVariants = cva('', {
  variants: {
    direction: {
      default: '',
      col: 'flex-col',
    },
    size: {
      default: '',
      sm: 'sm:flex-col',
    },
  },
  defaultVariants: { direction: 'default', size: 'default' },
});

export interface InfoItemProps
  extends VariantProps<typeof labelVariants>,
    VariantProps<typeof contentVariants> {
  className?: string;
  label: string;
  contents: string[] | string;
  labelClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  more?: boolean;
  labelWidth?: string;
  contentGap?: string;
}

const InfoItem = ({
  className,
  label,
  contents,
  labelWidth = '',
  weight,
  direction,
  contentGap = '',
  size,
  more = false,
}: InfoItemProps) => {
  const isArray = Array.isArray(contents);

  return (
    <div className={cn('flex', className)}>
      <span
        className={cn('font-semibold', labelWidth, labelVariants({ weight }))}
      >
        {label}
      </span>
      {isArray ? (
        <ul
          className={cn(
            'flex',
            contentGap,
            contentVariants({ direction, size }),
          )}
        >
          {contents.map((text, index) => (
            <li className={'list-none'} key={`${text}_${index}`}>
              {text}
            </li>
          ))}
        </ul>
      ) : (
        <span className={cn({ 'sm:line-clamp-3': !more })}>{contents}</span>
      )}
    </div>
  );
};

export default InfoItem;

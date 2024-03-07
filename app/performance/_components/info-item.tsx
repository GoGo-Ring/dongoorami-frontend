import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '~/libs/utils';

const labelVariants = cva('', {
  variants: {
    width: {
      default: '',
      90: 'w-[90px]',
    },
    weight: {
      default: '',
      semibold: 'text-xl font-semibold',
    },
  },
  defaultVariants: { width: 'default', weight: 'default' },
});

const contentVariants = cva('', {
  variants: {
    direction: {
      default: '',
      col: 'flex-col',
    },
    gap: {
      default: '',
      1: 'gap-1',
    },
    size: {
      default: '',
      sm: 'sm:flex-col',
    },
  },
  defaultVariants: { direction: 'default', gap: 'default', size: 'default' },
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
}

const InfoItem = ({
  className,
  label,
  contents,
  width,
  weight,
  direction,
  gap,
  size,
  more = false,
}: InfoItemProps) => {
  const isArray = Array.isArray(contents);

  return (
    <div className={cn('flex', className)}>
      <span className={cn('font-semibold', labelVariants({ width, weight }))}>
        {label}
      </span>
      {isArray ? (
        <ul className={cn('flex', contentVariants({ direction, gap, size }))}>
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

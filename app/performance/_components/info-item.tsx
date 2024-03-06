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

interface InfoItemProps
  extends VariantProps<typeof labelVariants>,
    VariantProps<typeof contentVariants> {
  className?: string;
  label: string;
  contents: string[] | string;
  labelClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

const InfoItem = ({
  className,
  label,
  contents,
  width,
  weight,
  direction,
  gap,
  children,
  size,
}: InfoItemProps) => {
  const isArray = typeof contents !== 'string';

  return (
    <div className={cn('flex', className)}>
      <div className="flex justify-between">
        <span className={cn('font-semibold', labelVariants({ width, weight }))}>
          {label}
        </span>
        {children}
      </div>
      <div className={cn('flex', contentVariants({ direction, gap, size }))}>
        {isArray ? (
          contents.map((text, index) => (
            <span key={`${text}_${index}`}>{text}</span>
          ))
        ) : (
          <span>{contents}</span>
        )}
      </div>
    </div>
  );
};

export default InfoItem;

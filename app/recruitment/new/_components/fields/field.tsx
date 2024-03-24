import { VariantProps, cva } from 'class-variance-authority';

import { Label } from '~/components/label';
import { cn } from '~/libs/utils';
import { PropsWithRequiredChildren } from '~/types/utils';

const FieldVariants = cva('items-start flex w-full min-w-16', {
  variants: {
    variant: {
      default: 'sm:flex-wrap',
      radio: 'sm:flex-nowrap pt-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const LabelVariants = cva('text-nowrap', {
  variants: {
    labelVariant: {
      radio: 'px-2 text-xs',
      default: 'w-24 flex-shrink-0 text-base font-semibold p-1',
      slider: '',
    },
  },
  defaultVariants: {
    labelVariant: 'default',
  },
});

export interface FieldProps
  extends VariantProps<typeof FieldVariants>,
    VariantProps<typeof LabelVariants> {
  id: string;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export const Field = ({
  children,
  id,
  label,
  variant,
  labelVariant,
  className,
  labelClassName,
}: PropsWithRequiredChildren<FieldProps>) => (
  <div className={cn(className, FieldVariants({ variant }))}>
    <Label
      className={cn(labelClassName, LabelVariants({ labelVariant }))}
      htmlFor={id}
    >
      {label}
    </Label>
    <div className="flex w-full flex-col justify-start truncate p-1">
      {children}
    </div>
  </div>
);

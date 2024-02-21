import { VariantProps, cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

import { INITIAL_VALUES } from '~/app/recruitment/new/constants';
import { Label } from '~/components/label';
import { cn } from '~/libs/utils';

export type FieldIds = keyof typeof INITIAL_VALUES;

const FieldVariants = cva('', {
  variants: {
    variant: {
      title: 'flex w-full items-center',
      default: 'flex w-[45%] items-center',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const LabelVariants = cva('', {
  variants: {
    labelVariant: {
      radio: 'pr-4 text-base ',
      default: 'w-24 flex-shrink-0 text-nowrap text-base font-semibold',
    },
  },
  defaultVariants: {
    labelVariant: 'default',
  },
});

export interface FieldProps
  extends VariantProps<typeof FieldVariants>,
    VariantProps<typeof LabelVariants> {
  id: FieldIds;
  label?: string;
  placeholder?: string;
}

export const Field = ({
  children,
  id,
  label,
  variant,
  labelVariant,
}: PropsWithChildren<FieldProps>) => (
  <div className={cn(FieldVariants({ variant }))}>
    <Label className={cn(LabelVariants({ labelVariant }))} htmlFor={id}>
      {label}
    </Label>
    {children}
  </div>
);

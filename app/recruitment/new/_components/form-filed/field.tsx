import { VariantProps, cva } from 'class-variance-authority';

import { INITIAL_VALUES } from '~/app/recruitment/new/constants';
import { Label } from '~/components/label';
import { cn } from '~/libs/utils';
import { PropsWithRequiredChildren } from '~/types/utils';

export type FieldIds = keyof typeof INITIAL_VALUES;

const FieldVariants = cva('', {
  variants: {
    variant: {
      title: 'flex w-full items-start',
      slider: 'flex w-full items-start',
      default: 'flex w-[45%] items-start',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const LabelVariants = cva('', {
  variants: {
    labelVariant: {
      radio: 'pr-4 text-xm text-nowrap',
      default: 'w-24 flex-shrink-0 text-nowrap text-base font-semibold p-1',
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
}: PropsWithRequiredChildren<FieldProps>) => (
  <div className={cn(FieldVariants({ variant }))}>
    <Label className={cn(LabelVariants({ labelVariant }))} htmlFor={id}>
      {label}
    </Label>
    <div className="flex w-full flex-col justify-start">{children}</div>
  </div>
);

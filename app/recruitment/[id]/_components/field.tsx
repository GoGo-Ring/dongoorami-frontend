import { Label } from '~/components/label';

interface FieldProps {
  label: string;
  value: string | number;
}

const Field = ({ label, value }: FieldProps) => {
  return (
    <div className="flex w-full min-w-16 items-start p-1">
      <Label className="w-24 flex-shrink-0 text-nowrap text-base font-semibold">
        {label}
      </Label>
      <p className="flex w-full flex-col justify-start">{value}</p>
    </div>
  );
};

export default Field;

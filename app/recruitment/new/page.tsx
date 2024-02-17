'use client';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { RadioGroup, RadioGroupItem } from '~/components/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/select';
import { Textarea } from '~/components/textarea';

import { Slider } from './_components/double-thumb-slider';
import {
  FORM_IDS,
  FORM_ITEMS,
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from './constants';

interface FieldProps {
  children: React.ReactNode;
  htmlFor?: string;
  label?: string;
}

const Field = ({ children, htmlFor, label }: FieldProps) => (
  <div className="flex w-[45%] items-center ">
    <Label
      className=" w-24 flex-shrink-0 text-nowrap text-base font-semibold"
      htmlFor={htmlFor}
    >
      {label}
    </Label>
    {children}
  </div>
);

const Page = () => {
  return (
    <div className="flex justify-center py-10">
      <form className="flex w-[890px] flex-col justify-center gap-12">
        <div className="flex w-full items-center gap-7">
          <Label
            className="text-nowrap text-xl font-semibold"
            htmlFor={FORM_IDS.TITLE}
          >
            제목
          </Label>
          <Input
            id={FORM_IDS.TITLE}
            type="text"
            placeholder={FORM_PLACEHOLDERS.TITLE}
          />
        </div>

        <Field htmlFor="image" label="이미지">
          <Input type="file" id="image" />
        </Field>
        <div className="flex flex-wrap items-center gap-7 rounded-md border border-gray-200 p-6">
          <Field htmlFor={FORM_IDS.PERFORMANCE} label={FORM_LABELS.PERFORMANCE}>
            <Input
              id={FORM_IDS.PERFORMANCE}
              type="text"
              placeholder={FORM_PLACEHOLDERS.PERFORMANCE}
            />
          </Field>

          <Field
            htmlFor={FORM_IDS.PERFORMANCE_LOCATION}
            label={FORM_LABELS.PERFORMANCE_LOCATION}
          >
            <Input
              id={FORM_IDS.PERFORMANCE_LOCATION}
              type="text"
              placeholder={FORM_PLACEHOLDERS.PERFORMANCE_LOCATION}
            />
          </Field>

          <Field htmlFor={FORM_IDS.LOCATION} label={FORM_LABELS.LOCATION}>
            <Select>
              <SelectTrigger className="w-[180px]" id={FORM_IDS.LOCATION}>
                <SelectValue placeholder={FORM_PLACEHOLDERS.LOCATION} />
              </SelectTrigger>
              <SelectContent>
                {FORM_ITEMS.LOCATION.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={FORM_LABELS.AGE}>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Input type="text" min={0} />
                <Input type="text" max={100} />
              </div>
              <Slider defaultValue={[0, 100]} minStepsBetweenThumbs={1} />
            </div>
          </Field>

          <Field
            htmlFor={FORM_IDS.PARTICIPANTS}
            label={FORM_LABELS.PARTICIPANTS}
          >
            <Select>
              <SelectTrigger className="w-[180px]" id={FORM_IDS.PARTICIPANTS}>
                <SelectValue placeholder={FORM_PLACEHOLDERS.PARTICIPANTS} />
              </SelectTrigger>
              <SelectContent id={FORM_IDS.PARTICIPANTS}>
                {FORM_ITEMS.PARTICIPANTS.map(participant => (
                  <SelectItem key={participant} value={participant}>
                    {participant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={FORM_LABELS.GENDER}>
            <RadioGroup className="flex w-full">
              <RadioGroupItem value="male" id={FORM_IDS.M} />
              <Label htmlFor={FORM_IDS.M}>{FORM_LABELS.M}</Label>
              <RadioGroupItem value="female" id={FORM_IDS.F} />
              <Label htmlFor={FORM_IDS.F}>{FORM_LABELS.F}</Label>
              <RadioGroupItem value="any" id={FORM_IDS.ANY} />
              <Label htmlFor={FORM_IDS.ANY}>{FORM_LABELS.ANY}</Label>
            </RadioGroup>
          </Field>
        </div>

        <Textarea
          className="h-80 resize-none"
          placeholder={FORM_PLACEHOLDERS.TEXTAREA}
        />

        <div className="flex gap-8">
          <Button className="w-full bg-primary text-primary-foreground">
            입력 완료
          </Button>
          <Button className="w-full bg-secondary text-secondary-foreground">
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;

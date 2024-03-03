import { PropsWithRequiredChildren } from '~/types/utils';

const Section = ({ children }: PropsWithRequiredChildren) => {
  return (
    <div className="flex items-start gap-7 rounded-md border border-gray-200 p-6 sm:flex-wrap md:flex-wrap">
      {children}
    </div>
  );
};

export default Section;

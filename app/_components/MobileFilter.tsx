import { useState } from 'react';

import Icon from '~/components/icon';
import { Sheet, SheetContent, SheetTrigger } from '~/components/sheet';

import CompanionRecruitmentFilter from './companion-recruitment-filter';

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 left-4 hidden sm:absolute sm:bottom-0 sm:bottom-16 sm:left-0 sm:block">
          <Icon
            className="fixed h-[35px] w-[35px] cursor-pointer"
            iconName="filter"
          />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-scroll">
        <div className="flex w-full justify-center border p-8">
          <CompanionRecruitmentFilter
            onSubmit={() => {
              return 1;
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilter;

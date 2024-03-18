import CompanionRecruitmentFilter from './companion-recruitment-filter';

const MainFilter = () => {
  return (
    <div className="border  sm:hidden">
      <div className="sticky top-0 flex h-[900px] w-[220px] justify-center p-4">
        <CompanionRecruitmentFilter
          onSubmit={() => {
            return 1;
          }}
        />
      </div>
    </div>
  );
};

export default MainFilter;

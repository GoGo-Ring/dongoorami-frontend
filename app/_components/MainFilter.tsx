import CompanionRecruitmentFilter from './companion-recruitment-filter';

const MainFilter = () => {
  return (
    <div className="flex w-[220px] justify-center border p-8 sm:hidden">
      <CompanionRecruitmentFilter
        onSubmit={() => {
          return 1;
        }}
      />
    </div>
  );
};

export default MainFilter;

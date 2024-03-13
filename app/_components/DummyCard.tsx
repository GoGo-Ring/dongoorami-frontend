import CompanionRecruitmentCard from './CompanionRecruitmentCard';

export const DummyCard = () => {
  const currentDate = new Date();

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <CompanionRecruitmentCard
        title="동행 구해요"
        concertName="콘"
        userId="dd"
        gender="male"
        personCount={2}
        viewCount={3}
        commentsCount={3}
        date={currentDate}
        status="모집 중"
      />
    </div>
  );
};
